// import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { iBodyPart } from '@/interfaces/BodyParts'
import { IWeapon } from '@/interfaces/IItem'
import { Inventory } from './inventoryModel'

// const { head, leftArm, rightArm, torso, leftLeg, rightLeg } = bodyPartsModel

class PlayerModel {
    constructor(
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
        public bodyParts: iBodyPart,
        public weapon: IWeapon | null = null,
        public description: string = '',
        public inventory: Inventory = new Inventory(),
        public isAlive: boolean = true,
        public player: boolean = true
    ) {
        // super(name, race, stats, bodyParts, weapon, description, inventory, isAlive)
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
