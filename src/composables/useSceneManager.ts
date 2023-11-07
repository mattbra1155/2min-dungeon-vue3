import { reactive, toRefs } from 'vue'
import { IScene } from '@/interfaces/IScene'
import { Scene } from '@/assets/models/sceneModel'
import localforage from 'localforage'
import { MonsterModel } from '@/assets/models/monsterModel'

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
        console.log(scene)

        setScene(scene)
    }
    const setScene = (scene: Scene) => {
        state.activeScene = scene
    }

    const resetScene = () => {
        state.activeScene = null
    }

    const saveScene = () => {
        localforage.setItem('activeScene', state.activeScene)
    }
    const loadScene = async () => {
        const data = (await localforage.getItem('activeScene')) as string
        const savedScene = JSON.parse(data)
        console.log(saveScene)

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
            room.monsterList = room.monsterList.map((monster) => (monster = Object.assign(new MonsterModel(), monster)))
        })
        console.log(scene.roomList)

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
