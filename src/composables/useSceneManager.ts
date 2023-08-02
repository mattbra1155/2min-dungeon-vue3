// import { SceneGenerator } from '@/assets/generators/sceneGenerator.js'
import { reactive, toRefs } from 'vue'
import { monsterGenerator } from '@/assets/generators/monsterGenerator'
import { iScene } from '@/interfaces/Scene'
import { MonsterModel } from '@/interfaces/MonsterModel'

interface iStateUseSceneManager {
    currentId: number
    sceneList: iScene[]
    scene: iScene | null
}

const state: iStateUseSceneManager = reactive({
    currentId: 0,
    scene: null,
    sceneList: [],
})

export const useSceneManager = () => {
    const createMonster = () => {
        const monster = monsterGenerator.create()
        return monster
    }

    const createScene = (numberOfEnemies = 1, levelName?: string) => {
        console.log('create')

        const enemyList: MonsterModel[] = []
        const createEnemyList = (enemiesToCreate = numberOfEnemies) => {
            let createdEnemies = 0
            while (createdEnemies < enemiesToCreate) {
                createdEnemies++
                const enemy = createMonster()
                enemyList.push(enemy)
            }
        }
        const scene: iScene = {
            id: state.currentId++,
            name: levelName || `level ${state.currentId}`,
            enemy: enemyList,
        }

        createEnemyList()
        setScene(scene)
    }
    const setScene = (scene: iScene) => {
        state.scene = scene
    }

    const resetScene = () => {
        state.currentId = 0
    }

    return {
        ...toRefs(state),
        createScene,
        resetScene,
    }
}
