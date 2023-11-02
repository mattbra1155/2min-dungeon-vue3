import { reactive, toRefs } from 'vue'
import { monsterGenerator } from '@/App.vue'
import { IScene } from '@/interfaces/IScene'
import { MonsterModel } from '@/assets/models/monsterModel'
import { Scene } from '@/assets/models/sceneModel'

interface iStateUseSceneManager {
    sceneList: IScene[]
    activeScene: Scene | null
}

const state: iStateUseSceneManager = reactive({
    activeScene: null,
    sceneList: [],
})

export const useSceneManager = () => {
    const createMonster = () => {
        const monster = monsterGenerator.create()
        return monster
    }

    const createScene = (numberOfEnemies = 1, levelName?: string) => {
        const enemyList: MonsterModel[] = []
        const createEnemyList = (enemiesToCreate = numberOfEnemies) => {
            let createdEnemies = 0
            while (createdEnemies < enemiesToCreate) {
                createdEnemies++
                const enemy = createMonster()
                enemyList.push(enemy)
            }
        }

        const scene: Scene = new Scene()

        scene.fetchSceneDetails(0)

        setScene(scene)
    }
    const setScene = (scene: Scene) => {
        state.activeScene = scene
    }

    const resetScene = () => {
        state.activeScene = null
    }

    return {
        ...toRefs(state),
        createScene,
        resetScene,
    }
}
