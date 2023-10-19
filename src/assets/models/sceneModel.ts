import { IScene } from '@/interfaces/IScene'
import { MonsterModel } from './monsterModel'
import { PlayerModel } from './playerModel'

class Scene implements IScene {
    constructor(
        public id: number = 0,
        public name: string = '',
        public enemyList: string[] = [],
        public entityList: Array<PlayerModel | MonsterModel> = []
    ) {
        this.id = id
        this.name = name
        this.enemyList = enemyList
        this.entityList = entityList
    }

    addEntity = (entity: PlayerModel | MonsterModel) => {
        this.entityList.push(entity)
    }
}

export { Scene }
