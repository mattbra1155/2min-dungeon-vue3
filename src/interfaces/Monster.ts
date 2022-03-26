import { iPerson } from '@/interfaces/Person'
import { iBodyParts } from '@/interfaces/BodyParts'

export interface iMonster extends iPerson {
    id: number
    bodyParts: iBodyParts
}
