// import { SceneGenerator } from '@/assets/generators/sceneGenerator.js'
import { reactive, toRefs } from 'vue'
import { monsterGenerator } from '@/assets/generators/monsterGenerator'
import { iScene } from '@/interfaces/Scene'
import { Scene } from '@/assets/models/sceneModel'
import { iMonster } from '@/interfaces/Monster'

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

    const createScene = (levelName: string, numberOfEnemies = 1) => {
        const id = state.scene.id++
        const name = levelName || 'name level placeholder'
        const enemyList: iMonster[] = []
        const createEnemyList = (enemiesToCreate = numberOfEnemies) => {
            let createdEnemies = 0
            while (createdEnemies < enemiesToCreate) {
                createdEnemies++
                const enemy = createMonster()
                console.log(enemy)
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
