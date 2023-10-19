import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'

export interface IScene {
    id: number
    name: string
    enemyList: string[]
    entityList: Array<PlayerModel | MonsterModel>

    addEntity(entity: PlayerModel | MonsterModel): void
}
