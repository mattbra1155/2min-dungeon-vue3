// import { SceneGenerator } from '@/assets/generators/sceneGenerator.js'
import { IScene } from '@/interfaces/IScene'
import { Scene } from '@/assets/models/sceneModel'
import { monsterGenerator } from '../generators/monsterGenerator'
import { player, playerManager } from './playerManager'
import { MonsterModel } from './monsterModel'

interface iStateUseSceneManager {
    currentId: number
    scene: IScene | undefined
    sceneList: IScene[]
}

class SceneManager implements iStateUseSceneManager {
    constructor(
        public currentId: number = 0,
        public scene: IScene | undefined = undefined,
        public sceneList: IScene[] = []
    ) {
        this.currentId = currentId
        this.scene = scene
        this.sceneList = sceneList
    }

    createMonster = () => {
        const monster = monsterGenerator.create()
        return monster
    }
    createScene = (numberOfEnemies = 1, levelName?: string) => {
        console.log('create')

        const enemyList: MonsterModel[] = []
        const createEnemyList = (enemiesToCreate = numberOfEnemies) => {
            let createdEnemies = 0
            while (createdEnemies < enemiesToCreate) {
                createdEnemies++
                const enemy = this.createMonster()
                enemyList.push(enemy)
                scene.addEntity(enemy)
            }
        }

        const scene: Scene = new Scene(this.currentId++, levelName || `level ${this.currentId++}`, enemyList)

        createEnemyList()

        console.log(player.id, playerManager.player.id)

        scene.addEntity(player)

        console.log(scene)

        sceneManager.setScene(scene)
    }

    setScene = (scene: Scene) => {
        this.scene = scene
    }

    resetScene = () => {
        this.currentId = 0
    }
}

const sceneManager = new SceneManager()

export { sceneManager }
