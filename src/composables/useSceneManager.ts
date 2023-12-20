import { reactive, toRefs } from 'vue'
import { IScene } from '@/interfaces/IScene'
import { Scene } from '@/assets/models/sceneModel'
import localforage from 'localforage'
import { MonsterModel } from '@/assets/models/monsterModel'
import { ModifierItem } from '@/assets/models/modifierItemModel'
import { Status } from '@/assets/models/statusModel'
import { Inventory } from '@/assets/models/inventoryModel'
import locations from '@/assets/json/locations.json'
import { Room } from '@/assets/models/RoomModel'
interface iStateUseSceneManager {
    sceneList: IScene[]
    activeScene: Scene | null
}

const state: iStateUseSceneManager = reactive({
    activeScene: null,
    sceneList: [],
})

export const useSceneManager = () => {
    const createScene = (sceneId = '0', numberOfEnemies = 1, levelName?: string) => {
        const scene: Scene = new Scene()
        scene.fetchSceneDetails(sceneId)
        state.sceneList.push(scene)
        setScene(scene)
    }
    const setScene = (scene: Scene) => {
        state.activeScene = scene
    }

    const resetScene = () => {
        state.activeScene = null
        localforage.removeItem('activeScene')
    }

    const saveScene = async (sceneId: string, currentRoomId: string, roomList?: Room[]) => {
        console.log(roomList)
        const seen: any = []
        const val: any = {}
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
        // localforage.setItem('sceneList', JSON.stringify(state.sceneList))
    }
    const loadScene = async () => {
        interface payload {
            id: string
            currentRoom: string
            roomList: Room[]
        }
        const data: string = (await localforage.getItem('activeScene')) as string

        const savedScene: payload = JSON.parse(data)

        if (!savedScene) {
            console.log('CRATE SCENE: No saved scene')

            createScene()
            if (!state.activeScene) {
                return
            }
            const entry = state.activeScene.roomList.find((room) => room.id === '0')
            if (!entry) {
                return
            }
            state.activeScene.changeCurrentRoom(entry.id)
            return
        }

        const scene: Scene = new Scene()

        scene.fetchSceneDetails(scene.id)

        scene.currentRoom = scene.roomList.find((room) => room.id === savedScene.currentRoom)

        scene.roomList = scene.roomList.map((room) => {
            const roomData = savedScene.roomList.find((roomData) => roomData.id === room.id)

            if (roomData) {
                room = roomData
                room.isExplored = roomData.isExplored
            }

            room.monsterList = room.monsterList.map((monster) => {
                const ttt = new MonsterModel()
                const newMonster = Object.assign(ttt, monster)
                newMonster.inventory = new Inventory()
                newMonster.inventory = monster.inventory
                newMonster.status = new Status()
                return newMonster
            })
            return room
        })

        console.log('SCENE', scene)

        setScene(scene)
    }

    return {
        ...toRefs(state),
        createScene,
        setScene,
        resetScene,
        saveScene,
        loadScene,
    }
}
