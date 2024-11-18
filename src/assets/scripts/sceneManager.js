// import store from '@/store/index'
// import { SceneGenerator } from '@/assets/generators/sceneGenerator'
// import { MonsterGenerator } from '@/assets/generators/monsterGenerator'

// class SceneManager {
//     constructor() {
//         this.activeRoom = store.getters['scene/activeRoom']
//     }
//     createMonster() {
//         const monsterGenerator = new MonsterGenerator()
//         const monster = monsterGenerator.create()
//         store.dispatch('enemy/setEnemy', monster)
//         return monster
//     }
//     getPlayer() {
//         return store.getters['player/getPlayer']
//     }
//     getEnemy() {
//         return store.getters['enemy/getEnemy']
//     }
//     createLocation() {
//         this.createMonster()
//         const player = this.getPlayer()
//         const enemy = this.getEnemy()
//         const sceneGenerator = new SceneGenerator()
//         const scene = sceneGenerator.create(player, enemy)
//         store.dispatch('sceneManager/saveScene', scene)
//         this.setactiveRoom(scene)
//         return scene
//     }
//     setactiveRoom(scene) {
//         store.dispatch('sceneManager/setactiveRoom', scene)
//     }
//     archiveScene(sceneId) {
//         store.dispatch('sceneManager/archiveScene', sceneId)
//     }
// }

// // sceneManager(this.currentScene) {
// //     switch (this.currentScene) {
// //         case 'start':
// //             console.log(`Start Menu`)
// //             this.startScreen()
// //             break
// //         case 'characterCreation':
// //             console.log(`Character creation`)
// //             new CharacterGenerator().createPlayer()
// //             break
// //         case 'nextLevel': {
// //             console.log(`Next level`)
// //             const level = this.createLocation('level')
// //             document
// //                 .querySelectorAll('.feed__item')
// //                 .forEach(item => item.remove())
// //             this.currentScene = level
// //             console.log(level)
// //             break
// //         }
// //         case 'defeat': {
// //             console.log(`Defeat`)
// //             const defeat = this.createLocation('defeat')
// //             this.currentScene = defeat
// //             break
// //         }
// //         case 'win': {
// //             console.log(`Cleard level`)
// //             const win = this.createLocation('win')
// //             this.currentScene = win
// //             break
// //         }
// //     }
// // }

// export { SceneManager }
