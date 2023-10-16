import { EModifierTypes } from '@/enums/EModifierTypes'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { AllItemTypes } from './IItem'
import { PersonModel } from '@/assets/models/personModel'
import { IStats } from './IStats'

export interface IStatusItem {
    id: string
    name: string
    type: EModifierTypes | null
    origin: PlayerModel | MonsterModel | AllItemTypes | undefined
    target: PersonModel | undefined
    duration: {
        isInfinite: boolean
        isActive: boolean
        current: number | undefined
        max: number | undefined
    }
    updateOnBeginning: boolean
}

export interface IStatusDamageOverTime extends IStatusItem {
    use(target: PersonModel | MonsterModel): number | void
}

export interface IStatusBonusStats extends IStatusItem {
    bonusStatList: Partial<IStats> | undefined
    use(target: PlayerModel | MonsterModel): void
}

export interface IStatusBonusDamage extends IStatusItem {
    bonusDamage: number
    use(target: PersonModel | MonsterModel): number | void
}

export type IAllStatusTypes = IStatusItem | IStatusDamageOverTime | IStatusBonusDamage | IStatusBonusStats
export interface IStatus {
    list: IAllStatusTypes[]
}
