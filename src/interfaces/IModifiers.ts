import { EModifierTypes } from '@/enums/EModifierTypes'
import { IStats } from '@/interfaces/IStats'
import { IPlayer } from './IPlayer'
import { IMonster } from './IMonster'
import { PlayerModel } from '@/assets/models/playerModel'

export interface IModifierItem {
    id: string
    name: string
    type: EModifierTypes | null
    modifiers: Partial<IStats>
    owner: PlayerModel | IMonster | undefined
    target: PlayerModel | IMonster | undefined
    updateOnBeginning: boolean
}

export interface IModifiers {
    list: IModifierItem[]
}
