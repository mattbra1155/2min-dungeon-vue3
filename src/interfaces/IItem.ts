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
export interface IGold extends Omit<IItem, 'category' | 'isEquipped' | 'modifiers' | 'ownerId'> {
    amount: number
    ownerId?: string | undefined
}

export interface IWeapon extends IItem {
    damage: number
    traits: string[]
    wield(owner: PlayerModel | MonsterModel): void
    unequip(owner: PlayerModel | MonsterModel): void
}

export interface IArmor extends IItem {
    bodyPart: iBodyPart
    item: string
    armorPoints: number
    traits: string[]
    equip(owner: PlayerModel | MonsterModel): void
    unequip(owner: PlayerModel | MonsterModel): void
}

export interface IPotion extends IItem {
    item: string
    modifier: number
}

export type iUtility = IItem

export type AllItemTypes = IWeapon | IArmor | IPotion | IGold

export interface lootItem extends IItem {
    isTaken: boolean
}
