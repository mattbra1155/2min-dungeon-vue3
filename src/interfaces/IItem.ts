import { MonsterModel } from '@/assets/models/monsterModel'
import { iBodyPart } from './BodyParts'
import { PlayerModel } from '@/assets/models/playerModel'
import { ModifierItem } from '@/assets/models/modifierItemModel'

export interface IItem {
    id: string | undefined
    name: string
    description: string
    type: string
    category: string
    isEquipped: boolean
    ownerId: string | undefined
    modifiers: ModifierItem[]
}

export interface IWeapon extends IItem {
    damage: number
    prefix: IItemPrefix
    traits: []
    wield(owner: PlayerModel | MonsterModel): void
    unequip(owner: PlayerModel | MonsterModel): void
}

export interface IArmor extends IItem {
    bodyPart: iBodyPart
    item: string
    prefix: IItemPrefix
    armorPoints: number
    traits: []
    equip(owner: PlayerModel | MonsterModel): void
    unequip(owner: PlayerModel | MonsterModel): void
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
