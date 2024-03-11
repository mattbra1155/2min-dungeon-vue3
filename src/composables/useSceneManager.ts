import { reactive, toRefs } from 'vue'
import { IScene } from '@/interfaces/IScene'
import { Scene } from '@/assets/models/sceneModel'
import localforage from 'localforage'
import { MonsterModel } from '@/assets/models/monsterModel'
import { Status } from '@/assets/models/statusModel'
import { Inventory } from '@/assets/models/inventoryModel'
import { Room } from '@/assets/models/RoomModel'
import { RoomObject } from '@/assets/models/RoomObjectModel'
interface iStateUseSceneManager {
    sceneList: Scene[]
    activeScene: Scene | null
}

const state: iStateUseSceneManager = reactive({
    activeScene: null,
    sceneList: [],
})

export const useSceneManager = () => {
    const createScene = (sceneId: string, numberOfEnemies = 1, levelName?: string) => {
        const scene: Scene = new Scene()
        scene.fetchSceneDetails(sceneId)
        state.sceneList.push(scene)
        setScene(scene)
        if (sceneId !== 'town') {
            scene.changeCurrentRoom('0')
        }
    }
    const setScene = (scene: Scene) => {
        state.activeScene = scene
    }

    const resetScene = () => {
        state.activeScene = null
        localforage.removeItem('activeScene')
    }
    const resetSceneList = () => {
        state.sceneList = []
        localforage.removeItem('exploredSceneList')
    }

    const saveScene = async (sceneId: string, currentRoomId: string, roomList?: Room[]) => {
        // TO DO
        // move all arguments here instead of passing it each time
        const seen: any = []
        // save and remove cyclic objects from store
        await localforage.setItem(
            'activeScene',
            JSON.stringify({ sceneId, currentRoom: currentRoomId, roomList }, function (key, val) {
                if (val != null && typeof val == 'object') {
                    if (seen.indexOf(val) >= 0) {
                        return
                    }
                    seen.push(val)
                }
                return val
            })
        )
        console.log(state.sceneList)

        const exploredList = await localforage.getItem('exploredSceneList')
        console.log(exploredList)

        await localforage.setItem('exploredSceneList', JSON.stringify(state.sceneList))
    }
    const loadScene = async () => {
        // load and save state.sceneList
        const sceneListData = JSON.parse((await localforage.getItem('exploredSceneList')) as string)

        if (sceneListData) {
            state.sceneList = sceneListData.map((sceneData: IScene) => {
                const scene = new Scene()
                Object.assign(scene, sceneData)
                scene.roomList = scene.roomList.map((room) => {
                    const roomData = sceneData.roomList.find((roomData: any) => roomData.id === room.id)
                    if (roomData) {
                        room = roomData
                    }
                    room.monsterList = room.monsterList.map((monster) => {
                        const ttt = new MonsterModel()
                        const newMonster = Object.assign(ttt, monster)
                        newMonster.inventory = new Inventory()
                        newMonster.inventory = monster.inventory
                        newMonster.status = new Status()
                        return newMonster
                    })
                    room.roomObjects = room.roomObjects.map((objectItem) => {
                        const itemClass = new RoomObject()
                        const newObject = Object.assign(itemClass, objectItem)

                        return newObject
                    })

                    if (room.name === 'Burned down farm') {
                        room.image = 'images/burnedDownFarm.jpeg'
                    }

                    return Object.assign(new Room(), room)
                })
                return scene
            })
        }

        // load scene
        interface payload {
            sceneId: string
            currentRoom: string
            roomList: Room[]
        }
        const data: string = (await localforage.getItem('activeScene')) as string
        const savedSceneData: payload = JSON.parse(data)

        if (!savedSceneData) {
            console.log('CRATE SCENE: No saved scene')
            createScene('0')
            if (!state.activeScene) {
                return
            }
            const entry = state.activeScene.roomList.find((room) => room.id === '0')
            if (!entry) {
                return
            }
            console.log(entry)

            state.activeScene.changeCurrentRoom(entry.id)
            return
        }

        const scene: Scene = new Scene()
        scene.fetchSceneDetails(savedSceneData.sceneId)
        scene.roomList = scene.roomList.map((room) => {
            const roomData = savedSceneData.roomList.find((roomData) => roomData.id === room.id)
            if (roomData) {
                room = roomData
            }
            room.monsterList = room.monsterList.map((monster) => {
                const ttt = new MonsterModel()
                const newMonster = Object.assign(ttt, monster)
                newMonster.inventory = new Inventory()
                newMonster.inventory = monster.inventory
                newMonster.status = new Status()
                return newMonster
            })
            room.roomObjects = room.roomObjects.map((objectItem) => {
                const itemClass = new RoomObject()
                const newObject = Object.assign(itemClass, objectItem)

                return newObject
            })

            if (room.name === 'Burned down farm') {
                room.image = 'images/burnedDownFarm.jpeg'
            }
            return Object.assign(new Room(), room)
        })

        scene.changeCurrentRoom(savedSceneData.currentRoom)

        setScene(scene)
    }

    return {
        ...toRefs(state),
        createScene,
        setScene,
        resetScene,
        resetSceneList,
        saveScene,
        loadScene,
    }
}
