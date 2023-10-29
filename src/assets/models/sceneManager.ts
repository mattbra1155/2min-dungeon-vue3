// import { MonsterGenerator } from '@/assets/generators/monsterGenerator'
import { monsterGenerator } from '@/App.vue'
import { Scene } from './sceneModel'
import { IMonster } from '@/interfaces/IMonster'

class SceneManager {
    constructor(
        public currentId: number = 0,
        public scene: Scene | undefined = undefined,
        public sceneList: Scene[] = []
    ) {}
    createMonster() {
        const monster = monsterGenerator.create()
        return monster
    }

    createScene(numberOfEnemies = 1, levelName?: string) {
        const enemyList: IMonster[] = []
        const createEnemyList = (enemiesToCreate = numberOfEnemies) => {
            let createdEnemies = 0
            while (createdEnemies < enemiesToCreate) {
                createdEnemies++
                const enemy = this.createMonster()
                enemyList.push(enemy)
            }
        }
        const scene: Scene = new Scene()
        scene.fetchSceneDetails(0)
        console.log(scene)
        this.setScene(scene)
    }
    setScene(scene: Scene) {
        this.scene = scene
    }

    resetScene() {
        this.currentId = 0
    }
}

const sceneManager = new SceneManager()

export { sceneManager }
