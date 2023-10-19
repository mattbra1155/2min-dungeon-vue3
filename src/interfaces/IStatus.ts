import { EModifierTypes } from '@/enums/EModifierTypes'
import { IStats } from './IStats'

export interface IStatusItem {
    id: string
    name: string
    type: EModifierTypes | null
    originId: string | undefined
    targetId: string | undefined
    duration: {
        isInfinite: boolean
        isActive: boolean
        current: number | undefined
        max: number | undefined
    }
    updateOnBeginning: boolean
}

export interface IStatusDamageOverTime extends IStatusItem {
    use(targetId: string): number | void
}

export interface IStatusBonusStats extends IStatusItem {
    bonusStatList: Partial<IStats> | undefined
    use(targetId: string): void
}

export interface IStatusBonusDamage extends IStatusItem {
    bonusDamage: number
    use(targetId: string): number | void
}

export type IAllStatusTypes = IStatusItem | IStatusDamageOverTime | IStatusBonusDamage | IStatusBonusStats
export interface IStatus {
    list: IAllStatusTypes[]
}
