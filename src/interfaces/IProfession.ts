import { ISkill } from './ISkill'
import { IStats } from './IStats'

export interface IProfessionPayload {
    id: string
    name: string
    description: string
    statsDevelopment: {
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
        willpower: number
        charisma: number
    }
    skills: string[]
}

export interface IProfession {
    id: string
    name: string
    description: string
    statsDevelopment: Partial<IStats>
    skills: ISkill[]
}
