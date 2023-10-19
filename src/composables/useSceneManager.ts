// import { SceneGenerator } from '@/assets/generators/sceneGenerator.js'
import { reactive, toRefs } from 'vue'
import { monsterGenerator } from '@/assets/generators/monsterGenerator'
import { IScene } from '@/interfaces/IScene'
import { MonsterModel } from '@/assets/models/monsterModel'
import { Scene } from '@/assets/models/sceneModel'
import { usePlayer } from './usePlayer'
import { PlayerModel } from '@/assets/models/playerModel'
import { IMonster } from '@/interfaces/IMonster'
const { player } = usePlayer()
interface iStateUseSceneManager {
    currentId: number
    sceneList: IScene[]
    scene: IScene | null
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

        const enemyList: string[] = []
        const createEnemyList = (enemiesToCreate = numberOfEnemies) => {
            let createdEnemies = 0
            while (createdEnemies < enemiesToCreate) {
                createdEnemies++
                const enemy = createMonster()
                scene.addEntity(enemy)
            }
        }

        const scene: Scene = new Scene(state.currentId++, levelName || `level ${state.currentId}`, enemyList)

        createEnemyList()

        scene.addEntity(player.value)

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
