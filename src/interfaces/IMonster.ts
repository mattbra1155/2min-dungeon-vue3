import { IPerson } from '@/interfaces/Person'
import { iBodyParts } from '@/interfaces/BodyParts'

export interface IMonster extends IPerson {
    id: number
    bodyParts: iBodyParts
}
