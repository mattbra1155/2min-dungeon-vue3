import { EModifierTypes } from '@/enums/EModifierTypes'
import { IStats } from '@/interfaces/IStats'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { ModifierItem } from '@/assets/models/modifierItemModel'

export interface IModifierItem {
    config: {
        id: string
        name: string
        type: EModifierTypes | null
        owner: PlayerModel | MonsterModel | undefined
        target: PlayerModel | MonsterModel | undefined
        chanceToApply: number | null
        statusId: string
    }
}

export interface IModifiers {
    list: ModifierItem[]
}
