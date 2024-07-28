import { MonsterModel } from '@/assets/models/monsterModel'
import { iBodyPart } from './BodyParts'
import { PlayerModel } from '@/assets/models/playerModel'
import { Armor, Gold, Item, Material, Potion, Utility, Weapon } from '@/assets/models/itemsModel'
import { ModifierItem } from '@/assets/models/modifierItemModel'
import { EDice } from '@/enums/EDice'

export interface IItem {
    id: string | undefined
    name: string
    description: string
    type: string
    category: string
    isEquipped: boolean
    ownerId: string | undefined
    modifiers: ModifierItem[]
    price: number
    icon: string | undefined
}

export interface IWeapon extends IItem {
    damage: number
    isTwoHanded: boolean
    wield(owner: PlayerModel | MonsterModel): void
    unequip(owner: PlayerModel | MonsterModel): void
    requiredSkills: string[]
}

export interface IArmor extends IItem {
    bodyPart: string[]
    armorPoints: number
    material: string
    equip(owner: PlayerModel | MonsterModel): void
    unequip(owner: PlayerModel | MonsterModel): void
}

export interface IPotion extends IItem {
    item: string
    modifier: number
    baseValue: EDice
}

export interface IGold {
    id: string
    name: string
    description: string
    amount: number
    price: number
    category: string
    ownerId: string | undefined
}

export type iUtility = IItem

export type IMaterial = Omit<IItem, 'isEquipped' | 'modifiers'> & {
    ownerId: string | undefined
}

export type AllItemTypes = Weapon | Armor | Potion | Utility | Material

export function identity<Type>(arg: Type): Type {
    return arg
}

export interface ILootItem {
    isTaken: boolean
}

export function instanceOfArmor(object: any): object is Armor {
    return 'material' in object
}

export function hasIcon(object: any): object is IItem {
    return 'icon' in object
}
