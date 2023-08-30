import { iBodyPart } from '@/interfaces/BodyParts'
import { IArmor, IGold, IItem, IPotion, IWeapon } from '@/interfaces/IItem'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { EBodyParts } from '@/enums/EBodyParts'
import { ModifierItem } from './modifierItemModel'
import { EItemCategory } from '@/enums/ItemCategory'

class Item implements IItem {
    constructor(
        public id: string | undefined,
        public name: string,
        public description: string,
        public type: string,
        public category: string,
        public isEquipped: boolean = false,
        public ownerId: string | undefined = undefined,
        public modifiers: ModifierItem[] = []
    ) {
        this.name = name
        this.description = description
        this.type = type
        this.id = id
        this.category = category
        this.modifiers = modifiers
        this.isEquipped = isEquipped
        this.ownerId = ownerId
        this.modifiers = modifiers
    }
}

class Gold implements IGold {
    public id: string
    public name: string
    public description = 'Coins made of gold'
    public type: EItemCategory.Gold

    constructor(public amount = 0, public ownerId?: string) {
        this.id = 'gold'
        this.name = 'Gold'
        this.description
        this.type = EItemCategory.Gold
        this.ownerId = ownerId
        this.amount = amount
    }
}

class Weapon extends Item implements IWeapon {
    constructor(
        public id: string = '',
        public name: string = '',
        public description: string = '',
        public damage: number = 0,
        public category: string = '',
        public type: string = '',
        public isEquipped: boolean = false,
        public modifiers: ModifierItem[] = [],
        public traits: string[] = [],
        public ownerId: string | undefined = undefined
    ) {
        super(id, name, description, type, category, isEquipped, ownerId, modifiers)
        this.id = id
        this.name = `${name}`
        this.damage = damage
        this.type = type
        this.modifiers = modifiers
        this.isEquipped = isEquipped
        this.ownerId = ownerId
    }

    wield(owner: PlayerModel | MonsterModel) {
        if (!this) {
            console.error(`no weapon to wield!!`)
            return
        }
        owner.weapon = this
        this.isEquipped = true
        // assign modifier to owner after equipping
        this.modifiers.forEach((modifier) => {
            const foundModifier = !!owner.modifiers.list.find((item) => item.id === modifier.id)

            if (foundModifier) {
                console.log(`Modifier: "${modifier.name}" was already added`)
                return
            } else {
                owner.modifiers.addItem(modifier)
            }
        })
        owner.modifiers.updateCurrentStats(owner)
        console.log('wielded', this)
    }

    unequip(owner: PlayerModel | MonsterModel) {
        owner.weapon = null
        this.isEquipped = false
    }
}

class Armor extends Item implements IArmor {
    constructor(
        public id: string = '',
        public name: string = '',
        public description: string = '',
        public bodyPart: iBodyPart = bodyPartsModel,
        public type: string = '',
        public material: string = '',
        public category: string = '',
        public armorPoints: number = 0,
        public isEquipped: boolean = false,
        public ownerId: string | undefined = undefined,
        public modifiers: ModifierItem[] = [],
        public traits: string[] = []
    ) {
        super(id, name, description, type, category, isEquipped, ownerId, modifiers)
        this.id = id
        this.name = `${name}`
        this.type = type
        this.material = material
        this.category = category
        this.description = description
        this.isEquipped = isEquipped
        this.modifiers = modifiers
        this.traits = []
    }

    equip(owner: PlayerModel | MonsterModel) {
        if (!this) {
            console.log('no item to equip')
            return
        }
        // Find where the item should be worn
        const itemSlot: EBodyParts | undefined = Object.values(EBodyParts).find((bodyPart) => {
            if (bodyPart === this.bodyPart.toString()) {
                return bodyPart
            }
        })
        if (!itemSlot) {
            console.log('item slot not found')
            return
        }
        // equip the item
        owner.bodyParts[itemSlot].armor.item = this
        this.isEquipped = true
        console.log(`equiped ${this.name} on ${itemSlot}`)

        // assign modifier to owner after equipping
        this.modifiers.forEach((modifier) => {
            const foundModifier = !!owner.modifiers.list.find((item) => item.id === modifier.id)

            if (foundModifier) {
                console.log(`Modifier: "${modifier.name}" was already added`)
                return
            } else {
                owner.modifiers.addItem(modifier)
            }
            console.log('here')
        })
        owner.modifiers.updateCurrentStats(owner)
        console.log('Equipped', this)
    }

    unequip(owner: PlayerModel | MonsterModel) {
        const itemSlot: EBodyParts | undefined = Object.values(EBodyParts).find((bodyPart) => {
            if (bodyPart === this.bodyPart.toString()) {
                return bodyPart
            }
        })
        if (!itemSlot) {
            console.log('item slot not found')
            return
        }
        owner.bodyParts[itemSlot].armor.item = null
        this.isEquipped = false
    }
}

class Potion extends Item implements IPotion {
    constructor(
        public id: string = '',
        public name: string = '',
        public modifier: number = 0,
        public description: string = '',
        public type: string = '',
        public category: string = '',
        public item: string = ''
    ) {
        super(id, name, description, type, category)
        this.id = id
        this.item = item
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

export { Item, Weapon, Armor, Potion, Gold }
