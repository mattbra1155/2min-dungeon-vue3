
import { Person } from './personModel'

class Player extends Person {
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
        this.player = true
    }

    equipItem(item) {
        switch (item.category) {
            case 'armor': {
                let playerBodyPartKeys = Object.keys(this.bodyPart)

                const getBodyPart = playerBodyPartKeys.find(playerBodyPart => {
                    if (playerBodyPart === item.bodyPart) {
                        return playerBodyPart
                    }
                })
                this.bodyPart[getBodyPart].armor.item = item
                this.bodyPart[getBodyPart].armor.armorPoints = item.armorPoints
                break
            }
            case 'weapon':
                this.weapon = item
                break

            case 'potion':
                //todo
                this.stats.hp += item.modifier
                break

            case 'utility':
                //todo
                this.weapon = item
        }
    }

    pickUpItem(item) {
        this.inventory.push(item)
    }
}

export { Player }