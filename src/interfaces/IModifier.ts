import { EModifierTypes } from '@/enums/EModifierTypes'

export interface IModifier {
    id: number
    name: string
    type: EModifierTypes | null
}
