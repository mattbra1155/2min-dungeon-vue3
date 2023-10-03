import { EModifierTypes } from '@/enums/EModifierTypes'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { AllItemTypes } from './IItem'
import { PersonModel } from '@/assets/models/personModel'

export interface IStatusItem {
    id: string
    name: string
    type: EModifierTypes | null
    origin: PlayerModel | MonsterModel | AllItemTypes | undefined
    target: PersonModel | undefined
    updateOnBeginning: boolean

    use(target: PersonModel): number | void
}

export interface IStatusDamageOverTime extends IStatusItem {
    duration: {
        isActive: boolean
        current: number | undefined
        max: number | undefined
    }
}

export interface IStatusBonusDamage extends IStatusItem {
    bonusDamage: number
}

export type IAllStatusTypes = IStatusItem | IStatusDamageOverTime | IStatusBonusDamage
export interface IStatus {
    list: IAllStatusTypes[]
}
