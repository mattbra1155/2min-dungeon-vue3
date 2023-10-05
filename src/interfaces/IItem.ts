import { MonsterModel } from '@/assets/models/monsterModel'
import { iBodyPart } from './BodyParts'
import { PlayerModel } from '@/assets/models/playerModel'
import { Armor, Potion, Weapon } from '@/assets/models/itemsModel'
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
    traits: string[]
    wield(owner: PlayerModel | MonsterModel): void
    unequip(owner: PlayerModel | MonsterModel): void
}

export interface IArmor extends IItem {
    bodyPart: iBodyPart
    armorPoints: number
    traits: string[]
    material: string
    equip(owner: PlayerModel | MonsterModel): void
    unequip(owner: PlayerModel | MonsterModel): void
}

export interface IPotion extends IItem {
    item: string
    modifier: number
}

export interface IGold {
    id: string
    name: string
    description: string
    amount: number
    category: string
    ownerId: string | undefined
}

export type iUtility = IItem

export type AllItemTypes = Weapon | Armor | Potion

export interface ILootItem {
    isTaken: boolean
}
