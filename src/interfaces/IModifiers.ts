import { EModifierTypes } from '@/enums/EModifierTypes'
import { IStats } from '@/interfaces/IStats'
import { IPlayer } from './IPlayer'
import { IMonster } from './IMonster'

export interface IModifierItem {
    id: number
    name: string
    type: EModifierTypes | null
    modifiers: Partial<IStats>
    owner: IPlayer | IMonster
    target: IPlayer | IMonster
}

export interface IModifiers {
    list: IModifierItem[]
}
