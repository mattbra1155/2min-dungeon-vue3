import { iBodyPart } from '@/interfaces/BodyParts'
import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'

export interface iPerson {
    name: string
    race: string
    stats: {
        hp: number
        melee: number
        ranged: number
        dexterity: number
        strength: number
        thoughtness: number
        speed: number
        initiative: number
        attacks: number
        inteligence: number
        willPower: number
        charisma: number
    }
    weapon: IWeapon | null
    description: string
    inventory: Array<IWeapon | IArmor | IPotion>
    bodyParts: iBodyPart
    isAlive: boolean
}
