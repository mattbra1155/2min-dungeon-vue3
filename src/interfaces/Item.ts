import { iBodyParts } from './BodyParts'

export interface iItem {
    name: string
    description: string
    type: string
    id: number
    category: string
}

export interface iWeapon extends iItem {
    damage: number
    type: string
    prefix: iItemPrefix
    modifier: number
}

export interface iArmor extends iItem {
    modifier: string
    bodyPart: iBodyParts
    type: string
    item: string
    prefix: iItemPrefix
}

export interface iPotion extends iItem {
    item: string
    prefix: iItemPrefix
}

export type iUtility = iItem

export interface iItemPrefix {
    name: string
    modifier: number
}
