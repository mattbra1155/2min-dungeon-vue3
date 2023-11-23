import { reactive, toRefs } from 'vue'
import { IScene } from '@/interfaces/IScene'
import { Scene } from '@/assets/models/sceneModel'
import localforage from 'localforage'
import { MonsterModel } from '@/assets/models/monsterModel'
import { ModifierItem } from '@/assets/models/modifierItemModel'
import { Status } from '@/assets/models/statusModel'
import { Inventory } from '@/assets/models/inventoryModel'

interface iStateUseSceneManager {
    sceneList: IScene[]
    activeScene: Scene | null
}

const state: iStateUseSceneManager = reactive({
    activeScene: null,
    sceneList: [],
})

export const useSceneManager = () => {
    const createScene = (numberOfEnemies = 1, levelName?: string) => {
        const scene: Scene = new Scene()
        scene.fetchSceneDetails(0)
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

    const saveScene = () => {
        localforage.setItem('activeScene', JSON.stringify(state.activeScene))
        localforage.setItem('sceneList', JSON.stringify(state.sceneList))
    }
    const loadScene = async () => {
        const data = (await localforage.getItem('activeScene')) as string
        const savedScene = await JSON.parse(data)

        console.log('SAVED SCENE', savedScene)

        if (!savedScene) {
            createScene()
            if (!state.activeScene) {
                return
            }
            const entry = state.activeScene.roomList.find((room) => room.id === 0)
            if (!entry) {
                return
            }
            state.activeScene.changeCurrentRoom(entry)
            return
        }
        const scene: Scene = Object.assign(new Scene(), savedScene)
        scene.roomList.forEach((room) => {
            room.monsterList = room.monsterList.map((monster) => {
                const ttt = new MonsterModel()
                const newMonster = Object.assign(ttt, monster)
                newMonster.inventory = new Inventory()
                newMonster.inventory = monster.inventory
                newMonster.status = new Status()
                console.log(newMonster, new MonsterModel())

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
