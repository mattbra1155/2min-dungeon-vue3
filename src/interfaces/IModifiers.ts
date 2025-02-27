import { EModifierTypes } from '@/enums/EModifierTypes'
import { MonsterModel } from '@/assets/models/monsterModel'
import { ModifierItem } from '@/assets/models/modifierItemModel'
import { AllItemTypes } from '@/interfaces/IItem'
import { IPlayer } from '@/interfaces/IPlayer'

export interface IModifierItem {
    id: string
    name: string
    type: EModifierTypes | null
    owner: IPlayer | MonsterModel | AllItemTypes | undefined
    chanceToApply: number | null
    statusId: string

    use(target: IPlayer | MonsterModel): void
}

export interface IModifiers {
    list: ModifierItem[]
}
