import { EModifierTypes } from '@/enums/EModifierTypes'
import { IStats } from '@/interfaces/IStats'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { Modifiers } from '@/assets/models/modifiersModel'

export type IModifiersList = Partial<IStats> | Partial<{ damage: number; encumberence: number }>

export interface IModifierItem {
    id: string
    name: string
    type: EModifierTypes | null
    owner: PlayerModel | MonsterModel | undefined
    target: PlayerModel | MonsterModel | undefined
    updateOnBeginning: boolean
}

export interface IModifierDamageOverTime extends Omit<IModifierItem, 'modifiers'> {
    chanceToApply: number | null
    effectId: string
    duration: {
        isActive: boolean
        current: number | undefined
        max: number | undefined
    }
}

export interface IModifiers {
    list: IModifierItem[]
}
