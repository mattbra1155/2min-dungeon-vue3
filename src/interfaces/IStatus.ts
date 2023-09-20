import { EModifierTypes } from '@/enums/EModifierTypes'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'

export interface IStatusItem {
    id: string
    name: string
    type: EModifierTypes | null
    target: PlayerModel | MonsterModel | undefined
    duration: {
        isActive: boolean
        current: number | undefined
        max: number | undefined
    }
    origin: PlayerModel | MonsterModel | undefined
    updateOnBeginning: boolean
}

export interface IStatus {
    list: IStatusItem[]
}
