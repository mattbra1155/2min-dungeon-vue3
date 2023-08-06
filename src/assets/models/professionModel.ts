import { IProfession } from '@/interfaces/IProfession'
import { IStats } from '@/interfaces/IStats'

class Profession implements IProfession {
    constructor(
        public id: string = '0',
        public name: string = '',
        public description: string = '',
        public statsDevelopment: Partial<IStats> = {
            hp: {
                name: 'hp',
                symbol: 'hp',
                value: 0,
            },
            melee: {
                name: 'melee',
                symbol: 'mle',
                value: 0,
            },
            ranged: {
                name: 'ranged',
                symbol: 'rd',
                value: 0,
            },
            dexterity: {
                name: 'dexterity',
                symbol: 'dx',
                value: 0,
            },
            strength: {
                name: 'strength',
                symbol: 's',
                value: 0,
            },
            thoughtness: {
                name: 'thoughtness',
                symbol: 't',
                value: 0,
            },
            speed: {
                name: 'speed',
                symbol: 'spd',
                value: 0,
            },
            initiative: {
                name: 'initiative',
                symbol: 'i',
                value: 0,
            },
            attacks: {
                name: 'attacks',
                symbol: 'a',
                value: 0,
            },
            inteligence: {
                name: 'inteligence',
                symbol: 'int',
                value: 0,
            },
            willPower: {
                name: 'will powier',
                symbol: 'wp',
                value: 0,
            },
            charisma: {
                name: 'charisma',
                symbol: 'ch',
                value: 0,
            },
        }
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.statsDevelopment = statsDevelopment
    }
}

export { Profession }
