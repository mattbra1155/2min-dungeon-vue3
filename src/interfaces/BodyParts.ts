import { iArmor, iItem } from '@/interfaces/Item'

export interface iBodyParts {
    head: {
        name: 'Head'
        armor: {
            armorPoints: number
            item: iArmor | null
        }
    }
    rightArm: {
        name: 'Right arm'
        armor: {
            armorPoints: number
            item: iArmor | null
        }
    }
    leftArm: {
        name: 'Left arm'
        armor: {
            armorPoints: number
            item: iArmor | null
        }
    }
    torso: {
        name: 'Torso'
        armor: {
            armorPoints: number
            item: iArmor | null
        }
    }
    rightLeg: {
        name: 'Right leg'
        armor: {
            armorPoints: number
            item: iArmor | null
        }
    }
    leftLeg: {
        name: 'Left leg'
        armor: {
            armorPoints: number
            item: iArmor | null
        }
    }
}
