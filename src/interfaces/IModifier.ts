import { EModifierTypes } from '@/enums/EModifierTypes'
import { IStats } from '@/interfaces/IStats'

export interface IModifier {
    id: number
    name: string
    type: EModifierTypes | null
    modifiers: Partial<IStats>
}
