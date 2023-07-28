import { EModifierTypes } from '@/enums/EModifierTypes'
import { IStats } from '@/interfaces/IStats'
import { IMonster } from './IMonster'
import { PlayerModel } from '@/assets/models/playerModel'

export interface IModifierItem {
    id: string
    name: string
    type: EModifierTypes | null
    modifiers: Partial<IStats>
    owner: PlayerModel | IMonster | undefined
    target: PlayerModel | IMonster | undefined
    duration: {
        current: number | undefined
        max: number | undefined
    }
    updateOnBeginning: boolean
}

export interface IModifiers {
    list: IModifierItem[]
}
