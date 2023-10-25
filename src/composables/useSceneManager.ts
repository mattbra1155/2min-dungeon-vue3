// import { SceneGenerator } from '@/assets/generators/sceneGenerator.js'
import { reactive, toRefs } from 'vue'
import { monsterGenerator } from '@/assets/generators/monsterGenerator'
import { IScene } from '@/interfaces/IScene'
import { MonsterModel } from '@/assets/models/monsterModel'
import { Room } from '@/assets/models/RoomModel'
import { Scene } from '@/assets/models/sceneModel'

interface iStateUseSceneManager {
    currentId: number
    sceneList: IScene[]
    scene: Scene | null
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

        console.log(scene)

        setScene(scene)
    }
    const setScene = (scene: Scene) => {
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
