import { EModifierTypes } from '@/enums/EModifierTypes'
import { MonsterModel } from '@/assets/models/monsterModel'
import { AllItemTypes } from '@/interfaces/IItem'
import { IStats } from '@/interfaces/IStats'
import { IPlayer } from '@/interfaces/IPlayer'

export interface IStatusItem {
    id: string
    name: string
    type: EModifierTypes | null
    origin: IPlayer | MonsterModel | AllItemTypes | undefined
    target: IPlayer | MonsterModel | undefined
    duration: {
        isInfinite: boolean
        isActive: boolean
        current: number | undefined
        max: number | undefined
    }
    updateOnBeginning: boolean
}

export interface IStatusDamageOverTime extends IStatusItem {
    use(target: IPlayer | MonsterModel): number | void
}

export interface IStatusBonusStats extends IStatusItem {
    bonusStatList: Partial<IStats> | undefined
    use(target: IPlayer | MonsterModel): void
}

export interface IStatusBonusDamage extends IStatusItem {
    bonusDamage: number
    use(target: IPlayer | MonsterModel): number | void
}

export type IAllStatusTypes = IStatusItem | IStatusDamageOverTime | IStatusBonusDamage | IStatusBonusStats
export interface IStatus {
    list: IAllStatusTypes[]
}
