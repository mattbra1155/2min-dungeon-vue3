import { iBodyParts } from '@/interfaces/BodyParts'
import { iArmor, iItem, iPotion, iWeapon } from '@/interfaces/Item'
import { bodyPartsModel } from './bodyPartsModel'
const { head, leftArm, rightArm, torso, leftLeg, rightLeg } = bodyPartsModel

class Item implements iItem {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public type: string,
        public category: string
    ) {
        this.name = name
        this.description = description
        this.type = type
        this.id = id
        this.category = category
    }
}

class Weapon extends Item implements iWeapon {
    constructor(
        public id: number = 0,
        public name: string = '',
        public description: string = '',
        public damage: number = 0,
        public category: string = '',
        public type: string = '',
        public prefix: string = 'string',
        public modifier: number = 0
    ) {
        super(id, name, description, type, category)
        this.id = id
        this.damage = damage
        this.type = type
        this.prefix = prefix
        this.modifier = modifier
    }

    // get fullName() {
    //     return (this.name = `${this.prefix.name} ${this.name}`)
    // }

    // addModifier(baseItem, prefix) {
    //     let modifier
    //     const mods = baseItem.modifier === undefined ? 0 : baseItem.modifier
    //     const prefixMod = prefix.modifier
    //     modifier = mods + prefixMod

    //     return modifier
    // }
}

class Armor extends Item implements iArmor {
    constructor(
        public id: number = 0,
        public name: string = '',
        public description: string = '',
        public modifier: string = '',
        public bodyPart: iBodyParts = {
            head,
            leftArm,
            rightArm,
            torso,
            leftLeg,
            rightLeg,
        },
        public type: string = '',
        public item: string = '',
        public category: string = '',
        public prefix: string = ''
    ) {
        super(id, name, description, type, category)
        this.id = id
        this.name = name
        this.modifier = modifier
        this.type = type
        this.item = item
        this.prefix = prefix
    }
}

class Potion extends Item implements iPotion {
    constructor(
        public id: number = 0,
        public name: string = '',
        public modifier: number = 0,
        public description: string = '',
        public type: string = '',
        public category: string = '',
        public item: string = '',
        public prefix: string = ''
    ) {
        super(id, name, description, type, category)
        this.id = id
        this.item = item
        this.prefix = prefix
    }
}

// class Utility extends Item {
//     constructor(name, description, category) {
//         super(name, description, category)
//     }
// }

// let items = {
//     weapons: [
//         new Weapon('Old sword', 'An old rusty sword'),
//         new Weapon('Rusty mace', 'A rusty mace'),
//         new Weapon('Magic staff', 'a magic staff with a blue stone on top'),
//         new Weapon('Magic sword', 'Sword imbuded with some sort of magic', 0),
//         new Weapon('Magic mace', 'Heavy magic mace', 0),
//     ],
//     armors: {
//         head: [new Armor('Rusty helmet', 'an old and worn helmet', 6)],
//         hands: [],
//         torso: [],
//         legs: [],
//     },
//     potions: [
//         new Potion(
//             'Small health potion',
//             2,
//             'A small healing potion that recovers 10hp'
//         ),
//     ],
//     utility: [
//         new Utility(
//             'Torch',
//             'A torch that you can use to light dark areas. It also could be a weapon'
//         ),
//     ],
// }

export { Weapon, Armor, Potion }
