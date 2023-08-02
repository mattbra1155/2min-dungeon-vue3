import { IProfession } from '@/interfaces/IProfession'
import { IStats } from '@/interfaces/IStats'

class Profession implements IProfession {
    constructor(
        public id: string = '0',
        public name: string = '',
        public description: string = '',
        public statsDevelopment: Partial<IStats> = {
            hp: 0,
            melee: 0,
            ranged: 0,
            dexterity: 0,
            strength: 0,
            thoughtness: 0,
            speed: 0,
            initiative: 0,
            attacks: 0,
            inteligence: 0,
            willPower: 0,
            charisma: 0,
        }
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.statsDevelopment = statsDevelopment
    }
}

export { Profession }
