import { IArmor, IItem } from '@/interfaces/IItem'

export interface iBodyParts {
    head: {
        name: 'Head'
        armor: {
            armorPoints: number
            item: IArmor | null
        }
    }
    rightArm: {
        name: 'Right arm'
        armor: {
            armorPoints: number
            item: IArmor | null
        }
    }
    leftArm: {
        name: 'Left arm'
        armor: {
            armorPoints: number
            item: IArmor | null
        }
    }
    torso: {
        name: 'Torso'
        armor: {
            armorPoints: number
            item: IArmor | null
        }
    }
    rightLeg: {
        name: 'Right leg'
        armor: {
            armorPoints: number
            item: IArmor | null
        }
    }
    leftLeg: {
        name: 'Left leg'
        armor: {
            armorPoints: number
            item: IArmor | null
        }
    }
}
