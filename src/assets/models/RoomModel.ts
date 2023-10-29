import { AllItemTypes } from '@/interfaces/IItem'
import { MonsterModel } from './monsterModel'
import { Gold } from './itemsModel'
import { EDirections } from '@/enums/EDirections'
import monsterGenerator from '@/App.vue'
import { Scene } from './sceneModel'

interface IRoom {
    id: number
    name: string
    description: string
    monsterList: MonsterModel[]
    lootList: Array<AllItemTypes | Gold>
    exits: number[]
}

class Room implements IRoom {
    constructor(
        public id: number = 0,
        public name: string = `Room - ${id}`,
        public description: string = '',
        public monsterList: MonsterModel[] = [],
        public lootList: Array<AllItemTypes | Gold> = [],
        public exits: number[] = []
    ) {
        this.id
        this.name = name
        this.description = description
        this.exits = exits
        this.monsterList = monsterList
        this.lootList = lootList
    }

    createMonster = () => {
        const monster = monsterGenerator.create()
        return monster
    }

    createScene = (numberOfEnemies = 1, levelName?: string) => {
        const enemyList: MonsterModel[] = []
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

        // this.setScene(scene)
    }
}

export { Room }
