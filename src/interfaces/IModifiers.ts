import { EModifierTypes } from '@/enums/EModifierTypes'
import { IStats } from '@/interfaces/IStats'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'

export interface IModifierItem {
    id: string
    name: string
    type: EModifierTypes | null
    modifiers: Partial<IStats> | number
    owner: PlayerModel | MonsterModel | undefined
    target: PlayerModel | MonsterModel | undefined
    duration: {
        current: number | undefined
        max: number | undefined
    }
    updateOnBeginning: boolean
}

export interface IModifiers {
    list: IModifierItem[]
}
