import { SceneGenerator } from '@/assets/generators/sceneGenerator.js'
import { MonsterGenerator } from '@/assets/generators/monsterGenerator.js'
import { reactive } from 'vue'
import { iScene } from '@/interfaces/iScene'
import useEnemy from '@/composables/useEnemy'

export default function useSceneManager() {
    const { getEnemy, setEnemy } = useEnemy()
    const createMonster = () => {
        const monsterGenerator = new MonsterGenerator()
        const monster = monsterGenerator.create()
        setEnemy(monster)
        return monster
    }
    const getPlayer = () => {
        // return store.getters['player/getPlayer']
    }
    const createScene = () => {
        createMonster()
        const player = getPlayer()
        const enemy = getEnemy()
        const sceneGenerator = new SceneGenerator()
        const scene = sceneGenerator.create(player, enemy)
        // store.dispatch('sceneManager/saveScene', scene)
        setActiveScene(scene)
        return scene
    }
    const setActiveScene = (scene: iScene) => {
        // store.dispatch('sceneManager/setActiveScene', scene)
    }
    const archiveScene = (sceneId: number) => {
        // store.dispatch('sceneManager/archiveScene', sceneId)
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

export { SceneManager }
