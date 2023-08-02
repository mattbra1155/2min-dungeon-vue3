import { IStats } from './IStats'

export interface IProfession {
    id: string
    name: string
    description: string
    statsDevelopment: Partial<IStats>
}
