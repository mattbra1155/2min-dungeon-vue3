import { global } from '../scripts/index.js'
const races = [
    {
        name: 'human',
        stats: {
            hp: global.diceRollK3(),
            melee: global.diceRollK10() * 2,
            ranged: global.diceRollK10() * 2,
            dexterity: global.diceRollK10(),
            strength: global.diceRollK3(),
            thoughtness: global.diceRollK3(),
            speed: global.diceRollK3(),
            initiative: global.diceRollK10() * 2,
            attacks: 1,
            inteligence: global.diceRollK10() * 2,
            willPower: global.diceRollK10() * 2,
            charisma: global.diceRollK10() * 2
        },
        statModifiers: {
            hp: 4,
            melee: 20,
            ranged: 20,
            dexterity: 20,
            strength: 1,
            thoughtness: 1,
            speed: 2,
            initiative: 20,
            attacks: 0,
            inteligence: 20,
            'will power': 20,
            charisma: 20
        },
        description: 'human description'
    },
    {
        name: 'dwarf',
        stats: {
            hp: global.diceRollK3(),
            melee: global.diceRollK10() * 2,
            ranged: global.diceRollK10() * 2,
            dexterity: global.diceRollK10(),
            strength: global.diceRollK3(),
            thoughtness: global.diceRollK3(),
            speed: global.diceRollK2(),
            initiative: global.diceRollK10() * 2,
            attacks: 1,
            inteligence: global.diceRollK10() * 2,
            willPower: global.diceRollK10() * 2,
            charisma: global.diceRollK10() * 2
        },
        statModifiers: {
            hp: 5,
            melee: 30,
            ranged: 10,
            dexterity: 10,
            strength: 1,
            thoughtness: 2,
            speed: 2,
            initiative: 10,
            attacks: 0,
            inteligence: 20,
            'will power': 40,
            charisma: 20
        },
        description: 'dwarf description'
    }
]

export { races }
