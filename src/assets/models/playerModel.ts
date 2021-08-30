import { PersonModel } from '@/assets/models/personModel'
import { BodyParts } from '@/interfaces/BodyParts'
import { Item, Weapon } from '@/interfaces/Item'
import { Player } from '@/interfaces/Player'

class PlayerModel extends PersonModel implements Player {
    constructor(
        public name: string,
        public race: string,
        public profession: string,
        public stats: {
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
            willPower: number
            charisma: number
        },
        public weapon: Weapon,
        public description: string,
        public inventory: Array<Weapon>,
        public bodyParts: BodyParts,
        public isAlive: boolean,
        public player: boolean
    ) {
        super(
            name,
            race,
            stats,
            weapon,
            description,
            inventory,
            bodyParts,
            isAlive
        )
        this.name = name
        this.race = race
        this.stats = stats
        this.weapon = weapon
        this.inventory = inventory
        this.description = description
        this.isAlive = true
        this.player = true
    }

    // equipItem(item: Item) {
    //     switch (item.category) {
    //         case 'armor': {
    //             let playerBodyPartKeys = Object.keys(this.bodyParts)

    //             const getBodyPart = playerBodyPartKeys.find(
    //                 (playerBodyPart) => {
    //                     if (playerBodyPart === item.bodyPart) {
    //                         return playerBodyPart
    //                     }
    //                 }
    //             )
    //             this.bodyParts[getBodyPart].armor.item = item
    //             this.bodyParts[getBodyPart].armor.armorPoints = item.armorPoints
    //             break
    //         }
    //         case 'weapon':
    //             this.weapon = item
    //             break

    //         case 'potion':
    //             //todo
    //             this.hp += item.modifier
    //             break

    //         case 'utility':
    //             //todo
    //             this.weapon = item
    //     }
    // }

    // pickUpItem(item: Item) {
    //     this.inventory.push(item)
    // }
}

export { PlayerModel }
