import { EModifierTypes } from '@/enums/EModifierTypes'
import { IStats } from '@/interfaces/IStats'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { ModifierItem } from '@/assets/models/modifierItemModel'
import { PersonModel } from '@/assets/models/personModel'
import { AllItemTypes } from './IItem'

export interface IModifierItem {
    id: string
    name: string
    type: EModifierTypes | null
    owner: PlayerModel | MonsterModel | AllItemTypes | undefined
    chanceToApply: number | null
    statusId: string

    use(target: PersonModel): void
}

export interface IModifiers {
    list: ModifierItem[]
}
