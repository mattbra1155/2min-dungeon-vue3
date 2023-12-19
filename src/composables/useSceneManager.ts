import { reactive, toRefs } from 'vue'
import { IScene } from '@/interfaces/IScene'
import { Scene } from '@/assets/models/sceneModel'
import localforage from 'localforage'
import { MonsterModel } from '@/assets/models/monsterModel'
import { ModifierItem } from '@/assets/models/modifierItemModel'
import { Status } from '@/assets/models/statusModel'
import { Inventory } from '@/assets/models/inventoryModel'
import locations from '@/assets/json/locations.json'
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

    const saveScene = async (sceneId: string, currentRoomId: string) => {
        await localforage.setItem('activeScene', { sceneId, currentRoom: currentRoomId })
        // localforage.setItem('sceneList', JSON.stringify(state.sceneList))
    }
    const loadScene = async () => {
        interface payload {
            id: string
            currentRoom: string
        }
        const savedScene: payload = (await localforage.getItem('activeScene')) as payload

        console.log('SAVED SCENE', savedScene)

        if (!savedScene) {
            createScene()
            if (!state.activeScene) {
                return
            }
            console.log('DEBUG', state.activeScene)

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

        // TO FIX: set explored room OR store whole room list
        scene.roomList.forEach((room) => {
            if (!room.monsterList) {
                return
            }
            room.monsterList = room.monsterList.map((monster) => {
                const ttt = new MonsterModel()
                const newMonster = Object.assign(ttt, monster)
                newMonster.inventory = new Inventory()
                newMonster.inventory = monster.inventory
                newMonster.status = new Status()
                return newMonster
            })
        })

        console.log(state)

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
