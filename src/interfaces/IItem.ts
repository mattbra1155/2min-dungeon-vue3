import { IMonster } from '@/interfaces/IMonster'
import { iBodyPart } from './BodyParts'
import { PlayerModel } from '@/assets/models/playerModel'
import { ModifierItem } from '@/assets/models/modifierItemModel'

export interface IItem {
    id: number
    name: string
    description: string
    type: string
    category: string
    isEquipped: boolean
    modifiers: ModifierItem[]
}

export interface IWeapon extends IItem {
    damage: number
    prefix: IItemPrefix
    modifier: number
    wield(owner: PlayerModel | IMonster): void
    unequip(owner: PlayerModel | IMonster): void
}

export interface IArmor extends IItem {
    bodyPart: iBodyPart
    item: string
    prefix: IItemPrefix
    modifier: number
    armorPoints: number
    equip(owner: PlayerModel | IMonster): void
    unequip(owner: PlayerModel | IMonster): void
}

export interface IPotion extends IItem {
    item: string
    prefix: IItemPrefix
    modifier: number
}

export type iUtility = IItem

export interface IItemPrefix {
    name: string
    modifier: number
}
