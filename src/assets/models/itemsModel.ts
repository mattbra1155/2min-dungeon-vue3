import { iBodyParts } from '@/interfaces/BodyParts'
import { IArmor, IItem, IItemPrefix, IPotion, IWeapon } from '@/interfaces/IItem'
import { bodyPartsModel } from './bodyPartsModel'
const { head, leftArm, rightArm, torso, leftLeg, rightLeg } = bodyPartsModel

class Item implements IItem {
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

class Weapon extends Item implements IWeapon {
    constructor(
        public id: number = 0,
        public name: string = '',
        public description: string = '',
        public damage: number = 0,
        public category: string = '',
        public type: string = '',
        public prefix: IItemPrefix = { name: '', modifier: 0 },
        public modifier: number = 0
    ) {
        super(id, name, description, type, category)
        this.id = id
        this.name = `${prefix.name} ${name}`
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

class Armor extends Item implements IArmor {
    constructor(
        public id: number = 0,
        public name: string = '',
        public description: string = '',
        public modifier: number = 0,
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
        public armorPoints: number = 0,
        public prefix: IItemPrefix = { name: '', modifier: 0 }
    ) {
        super(id, name, description, type, category)
        this.id = id
        this.name = `${prefix.name} ${name}`
        this.modifier = modifier
        this.type = type
        this.item = item
        this.prefix = prefix
    }
}

class Potion extends Item implements IPotion {
    constructor(
        public id: number = 0,
        public name: string = '',
        public modifier: number = 0,
        public description: string = '',
        public type: string = '',
        public category: string = '',
        public item: string = '',
        public prefix: IItemPrefix = { name: '', modifier: 0 }
    ) {
        super(id, name, description, type, category)
        this.id = id
        this.item = item
        this.prefix = prefix
        this.modifier = modifier
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
