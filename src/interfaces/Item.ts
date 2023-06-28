import { iBodyParts } from './BodyParts'

export interface iItem {
    id: number
    name: string
    description: string
    type: string
    category: string
}

export interface iWeapon extends iItem {
    damage: number
    prefix: iItemPrefix
    modifier: number
}

export interface iArmor extends iItem {
    bodyPart: iBodyParts
    item: string
    prefix: iItemPrefix
    modifier: number
    armorPoints: number
}

export interface iPotion extends iItem {
    item: string
    prefix: iItemPrefix
    modifier: number
}

export type iUtility = iItem

export interface iItemPrefix {
    name: string
    modifier: number
}
