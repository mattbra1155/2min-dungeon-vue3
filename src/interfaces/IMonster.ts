import { iPerson } from '@/interfaces/Person'
import { iBodyParts } from '@/interfaces/BodyParts'

export interface IMonster extends iPerson {
    id: number
    bodyParts: iBodyParts
}
