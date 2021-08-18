export interface Item {
    name: string
    description: string
    type: string
    id: number
    category: string
}

export interface Weapon extends Item {
    damage: number
    type: string
    prefix: string
    modifier: string
}

export interface Armor extends Item {
    modifier: string
    bodyPart: string
    type: string
    item: string
    prefix: string
}

export interface Potion extends Item {
    item: string
    prefix: string
}

export interface Utility extends Item {}
