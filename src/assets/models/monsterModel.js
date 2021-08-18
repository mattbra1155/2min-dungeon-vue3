import { Person } from './personModel'

class Monster extends Person {
    constructor(
        name,
        race,
        hp,
        melee,
        ranged,
        dexterity,
        strength,
        thoughtness,
        speed,
        initiative,
        attacks,
        inteligence,
        charisma,
        weapon,
        inventory,
        description
    ) {
        super(
            name,
            race,
            hp,
            melee,
            ranged,
            dexterity,
            strength,
            thoughtness,
            speed,
            initiative,
            attacks,
            inteligence,
            charisma,
            weapon,
            inventory,
            description
        )
    }
}

export { Monster }