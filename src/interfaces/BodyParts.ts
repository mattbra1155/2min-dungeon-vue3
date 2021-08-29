import { Item } from '@/interfaces/Item'

export interface BodyParts {
    head: {
        name: 'Head'
        armor: {
            armorPoints: number
            item: Item | null
        }
    }
    'right arm': {
        name: 'Right arm'
        armor: {
            armorPoints: number
            item: Item | null
        }
    }
    'left arm': {
        name: 'Left arm'
        armor: {
            armorPoints: number
            item: Item | null
        }
    }
    torso: {
        name: 'Torso'
        armor: {
            armorPoints: number
            item: Item | null
        }
    }
    'right leg': {
        name: 'Right leg'
        armor: {
            armorPoints: number
            item: Item | null
        }
    }
    'left leg': {
        name: 'Left leg'
        armor: {
            armorPoints: number
            item: Item | null
        }
    }
}
