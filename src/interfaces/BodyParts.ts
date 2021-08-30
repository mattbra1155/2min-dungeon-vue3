import { Item } from '@/interfaces/Item'

export interface BodyParts {
    head: {
        name: 'Head'
        armor: {
            armorPoints: number
            item: Item | null
        }
    }
    rightArm: {
        name: 'Right arm'
        armor: {
            armorPoints: number
            item: Item | null
        }
    }
    leftArm: {
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
    rightLeg: {
        name: 'Right leg'
        armor: {
            armorPoints: number
            item: Item | null
        }
    }
    leftLeg: {
        name: 'Left leg'
        armor: {
            armorPoints: number
            item: Item | null
        }
    }
}
