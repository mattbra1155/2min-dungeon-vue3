import { Armor } from '@/assets/models/itemsModel'
import { EBodyParts } from '@/enums/EBodyParts'
import { IArmor } from '@/interfaces/IItem'

export type iBodyPart = {
    [key in EBodyParts]: {
        name: string
        armor: {
            armorPoints: number
            items: Armor[]
        }
    }
}
export interface iBodyParts {
    head: {
        name: 'Head'
        armor: {
            armorPoints: number
            items: IArmor[]
        }
    }
    rightArm: {
        name: 'Right arm'
        armor: {
            armorPoints: number
            items: IArmor[]
        }
    }
    leftArm: {
        name: 'Left arm'
        armor: {
            armorPoints: number
            items: IArmor[]
        }
    }
    torso: {
        name: 'Torso'
        armor: {
            armorPoints: number
            items: IArmor[]
        }
    }
    rightLeg: {
        name: 'Right leg'
        armor: {
            armorPoints: number
            items: IArmor[]
        }
    }
    leftLeg: {
        name: 'Left leg'
        armor: {
            armorPoints: number
            items: IArmor[]
        }
    }
}
