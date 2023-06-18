import { IMonster } from '@/interfaces/IMonster'
import { iScene } from '@/interfaces/Scene'

class Scene implements iScene {
    constructor(public id: number = 0, public name: string = '', public enemy: IMonster[]) {
        this.id = id
        this.name = name
        this.enemy = enemy
    }
}

export { Scene }
