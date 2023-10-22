import { Armor } from '@/assets/models/itemsModel'
import { EBodyParts } from '@/enums/EBodyParts'
import { IArmor } from '@/interfaces/IItem'

export type iBodyPart = {
    [key in EBodyParts]: {
        name: string
        armor: {
            armorPoints: number
            item: Armor | null
        }
    }
}
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
