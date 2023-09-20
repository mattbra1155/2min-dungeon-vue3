import { EModifierTypes } from '@/enums/EModifierTypes'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { AllItemTypes } from './IItem'

export interface IStatusItem {
    id: string
    name: string
    type: EModifierTypes | null
    origin: PlayerModel | MonsterModel | AllItemTypes | undefined
    target: PlayerModel | MonsterModel | undefined
    duration: {
        isActive: boolean
        current: number | undefined
        max: number | undefined
    }
    updateOnBeginning: boolean
}

export interface IStatus {
    list: IStatusItem[]
}
