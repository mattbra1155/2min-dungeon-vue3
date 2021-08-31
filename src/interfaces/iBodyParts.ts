import { iItem } from '@/interfaces/iItem'

export interface iBodyParts {
    head: {
        name: 'Head'
        armor: {
            armorPoints: number
            item: iItem | null
        }
    }
    rightArm: {
        name: 'Right arm'
        armor: {
            armorPoints: number
            item: iItem | null
        }
    }
    leftArm: {
        name: 'Left arm'
        armor: {
            armorPoints: number
            item: iItem | null
        }
    }
    torso: {
        name: 'Torso'
        armor: {
            armorPoints: number
            item: iItem | null
        }
    }
    rightLeg: {
        name: 'Right leg'
        armor: {
            armorPoints: number
            item: iItem | null
        }
    }
    leftLeg: {
        name: 'Left leg'
        armor: {
            armorPoints: number
            item: iItem | null
        }
    }
}
