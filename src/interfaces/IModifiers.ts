import { EModifierTypes } from '@/enums/EModifierTypes'
import { IStats } from '@/interfaces/IStats'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { ModifierDamageOverTime, ModifierStatus } from '@/assets/models/modifierItemModel'

export type IModifiersList = Partial<IStats> | Partial<{ damage: number; encumberence: number }>

export interface IModifierItem {
    id: string
    name: string
    type: EModifierTypes | null
    owner: PlayerModel | MonsterModel | undefined
    target: PlayerModel | MonsterModel | undefined
}

export interface IModifierDamageOverTime extends Omit<IModifierItem, 'modifiers' | 'owner'> {
    chanceToApply: number | null
    statusId: string
}

export interface IModifierStatus extends IModifierItem {
    duration: {
        isActive: boolean
        current: number | undefined
        max: number | undefined
    }
    origin: PlayerModel | MonsterModel | undefined
    updateOnBeginning: boolean
}

export type IModifierTypes = ModifierStatus | ModifierDamageOverTime

export interface IModifiers {
    list: (ModifierStatus | ModifierDamageOverTime)[]
}
