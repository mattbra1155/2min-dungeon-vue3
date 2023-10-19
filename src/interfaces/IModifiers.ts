import { EModifierTypes } from '@/enums/EModifierTypes'
import { ModifierItem } from '@/assets/models/modifierItemModel'

export interface IModifierItem {
    id: string
    name: string
    type: EModifierTypes | null
    ownerId: string | undefined
    chanceToApply: number | null
    statusId: string

    use(targetId: string): void
}

export interface IModifiers {
    list: ModifierItem[]
}
