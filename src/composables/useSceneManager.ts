// import { SceneGenerator } from '@/assets/generators/sceneGenerator.js'
import { reactive, toRefs } from 'vue'
import { monsterGenerator } from '@/assets/generators/monsterGenerator'
import { iScene } from '@/interfaces/Scene'
import { Scene } from '@/assets/models/sceneModel'
import { IMonster } from '@/interfaces/IMonster'

interface iStateUseSceneManager {
    sceneList: iScene[]
    scene: iScene
}

const state: iStateUseSceneManager = reactive({
    scene: new Scene(0, 'placeholder level name', []),
    sceneList: [],
})

export const useSceneManager = () => {
    const createMonster = () => {
        const monster = monsterGenerator.create()
        return monster
    }

    const createScene = (levelName?: string, numberOfEnemies = 1) => {
        const id = state.scene.id++
        const name = levelName || `level ${state.scene.id}`
        const enemyList: IMonster[] = []
        const createEnemyList = (enemiesToCreate = numberOfEnemies) => {
            let createdEnemies = 0
            while (createdEnemies < enemiesToCreate) {
                createdEnemies++
                const enemy = createMonster()
                enemyList.push(enemy)
            }
        }
        const scene: iScene = {
            id,
            name,
            enemy: enemyList,
        }
        createEnemyList()
        setScene(scene)
        console.log(scene)
    }
    const setScene = (scene: iScene) => {
        state.scene = scene
    }

    return {
        ...toRefs(state),
        createScene,
    }
}

