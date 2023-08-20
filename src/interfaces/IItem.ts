import { MonsterModel } from '@/assets/models/monsterModel'
import { iBodyPart } from './BodyParts'
import { PlayerModel } from '@/assets/models/playerModel'
import { ModifierItem } from '@/assets/models/modifierItemModel'
import { EStats } from '@/enums/EStats'
import { IStat, IStats } from './IStats'
import { IModifierItem } from './IModifiers'

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
    quality: IItemQuality
    traits: string[]
    wield(owner: PlayerModel | MonsterModel): void
    unequip(owner: PlayerModel | MonsterModel): void
}

export interface IArmor extends IItem {
    bodyPart: iBodyPart
    item: string
    quality: IItemQuality
    armorPoints: number
    traits: string[]
    equip(owner: PlayerModel | MonsterModel): void
    unequip(owner: PlayerModel | MonsterModel): void
}

export interface IPotion extends IItem {
    item: string
    quality: IItemQuality
    modifier: number
}

export type iUtility = IItem

export interface IQualityModifier {
    [key: string]: string | number | undefined
}

export interface IItemQuality {
    name: string
    modifier: IModifierItem[]
}
