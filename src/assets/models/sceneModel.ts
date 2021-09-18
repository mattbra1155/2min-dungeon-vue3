import { iMonster } from '@/interfaces/Monster'
import { iScene } from '@/interfaces/Scene'

class Scene implements iScene {
    constructor(public id: number = 0, public name: string = '', public enemy: iMonster[]) {
        this.id = id
        this.name = name
        this.enemy = enemy
    }
}

export { Scene }
