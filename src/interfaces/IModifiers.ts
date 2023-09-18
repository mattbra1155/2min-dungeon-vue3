import { EModifierTypes } from '@/enums/EModifierTypes'
import { IStats } from '@/interfaces/IStats'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { ModifierItem, ModifierStatus } from '@/assets/models/modifierItemModel'

export type IModifiersList = Partial<IStats> | Partial<{ damage: number; encumberence: number }>

export interface IModifierBase {
    id: string
    name: string
    type: EModifierTypes | null
    owner: PlayerModel | MonsterModel | undefined
    target: PlayerModel | MonsterModel | undefined
}

export interface IModiferItem extends Omit<IModifierBase, 'modifiers' | 'owner'> {
    chanceToApply: number | null
    statusId: string
}

export interface IModifierStatus extends IModifierBase {
    duration: {
        isActive: boolean
        current: number | undefined
        max: number | undefined
    }
    origin: PlayerModel | MonsterModel | undefined
    updateOnBeginning: boolean
}

export type IModifierTypes = ModifierStatus | ModifierItem

export interface IModifiers {
    list: (ModifierStatus | ModifierItem)[]
}
