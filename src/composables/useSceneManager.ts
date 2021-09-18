// import { SceneGenerator } from '@/assets/generators/sceneGenerator.js'
import { reactive } from 'vue'
import { MonsterGenerator } from '@/assets/generators/monsterGenerator.js'
import { iScene } from '@/interfaces/Scene'
import { useEnemy } from '@/composables/useEnemy'
import { usePlayer } from '@/composables/usePlayer'
import { Scene } from '@/assets/models/sceneModel'
import { PlayerModel } from '@/assets/models/playerModel'

interface iStateUseSceneManager {
    sceneList: iScene[]
    scene: iScene
}

const state: iStateUseSceneManager = reactive({
    scene: new Scene(0, 'placeholder level name', []),
    sceneList: [],
})

export const useSceneManager = () => {
    const { enemy, setEnemy } = useEnemy()
    const { player } = usePlayer()

    const createMonster = () => {
        const monsterGenerator = new MonsterGenerator()
        const monster = monsterGenerator.create()
        return monster
    }
    const createScene = (levelName: string) => {
        const id = state.scene.id++
        const name = levelName || 'name level placeholder'
        const enemy = createMonster()
        const enemyList = []
        enemyList.push(enemy)
        const scene = {
            id: state.scene.id++,
            name: 'placeholder level name',
            enemy: enemyList,
        }
        setScene(scene)
    }
    const setScene = (scene: iScene) => {
        state.scene = scene
    }

    return {
        createScene,
    }
}

// sceneManager(this.currentScene) {
//     switch (this.currentScene) {
//         case 'start':
//             console.log(`Start Menu`)
//             this.startScreen()
//             break
//         case 'characterCreation':
//             console.log(`Character creation`)
//             new CharacterGenerator().createPlayer()
//             break
//         case 'nextLevel': {
//             console.log(`Next level`)
//             const level = this.createScene('level')
//             document
//                 .querySelectorAll('.feed__item')
//                 .forEach(item => item.remove())
//             this.currentScene = level
//             console.log(level)
//             break
//         }
//         case 'defeat': {
//             console.log(`Defeat`)
//             const defeat = this.createScene('defeat')
//             this.currentScene = defeat
//             break
//         }
//         case 'win': {
//             console.log(`Cleard level`)
//             const win = this.createScene('win')
//             this.currentScene = win
//             break
//         }
//     }
// }
