// import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { iBodyPart } from '@/interfaces/BodyParts'
import { Inventory } from './inventoryModel'
import { bodyPartsModel } from './bodyPartsModel'
import { IPlayer } from '@/interfaces/IPlayer'
import { PersonModel } from './personModel'
import { Modifiers } from './modifiersModel'
import { Weapon } from './itemsModel'

class PlayerModel extends PersonModel implements IPlayer {
    constructor(
        public id: string = self.crypto.randomUUID(),
        public name: string = 'Charname',
        public race: string = 'dwarf',
        public profession: string = '',
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
        } = {
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
        },
        public bodyParts: iBodyPart = bodyPartsModel,
        public weapon: Weapon | null = null,
        public description: string = '',
        public inventory: Inventory = new Inventory(),
        public isAlive: boolean = true,
        public player: boolean = true,
        public modifiers: Modifiers = new Modifiers()
    ) {
        super(name, race, stats, bodyParts, weapon, description, inventory, isAlive, modifiers)
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
