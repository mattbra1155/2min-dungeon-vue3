import { EBodyParts } from '@/enums/EBodyParts'
import { IMonster } from '@/interfaces/IMonster'
import { IPlayer } from '@/interfaces/IPlayer'
import { iBodyPart } from './BodyParts'

export interface IItem {
    id: number
    name: string
    description: string
    type: string
    category: string
}

export interface IWeapon extends IItem {
    damage: number
    prefix: IItemPrefix
    modifier: number
    wield(owner: IPlayer | IMonster): void
}

export interface IArmor extends IItem {
    bodyPart: iBodyPart
    item: string
    prefix: IItemPrefix
    modifier: number
    armorPoints: number
    equip(owner: IPlayer | IMonster): void
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
