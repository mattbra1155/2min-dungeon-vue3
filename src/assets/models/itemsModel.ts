import { iBodyPart } from '@/interfaces/BodyParts'
import { IArmor, IGold, IItem, IPotion, IWeapon } from '@/interfaces/IItem'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { EBodyParts } from '@/enums/EBodyParts'
import { ModifierItem } from './modifierItemModel'
import { EItemCategory } from '@/enums/ItemCategory'
import { EModifierTypes } from '@/enums/EModifierTypes'
import { EPotionTypes } from '@/enums/EPotionTypes'
import { diceRollK6 } from '../scripts/diceRoll'
import { EDice } from '@/enums/EDice'
import { useInventory } from '@/composables/useInventory'

class Item implements IItem {
    constructor(
        public id: string | undefined,
        public name: string,
        public description: string,
        public type: string,
        public category: string,
        public isEquipped: boolean = false,
        public ownerId: string | undefined = undefined,
        public modifiers: ModifierItem[] = [],
        public price: number = 0
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
    public id = 'gold'
    public name = 'Gold'
    public description = 'Coins made of gold'
    public type = 'gold'
    public category = 'gold'
    public ownerId: string | undefined
    public amount: number

    constructor(amount = 0, ownerId: string | undefined = undefined) {
        this.description
        this.category
        this.type
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
        public ownerId: string | undefined = undefined,
        public requiredSkills: string[] = []
    ) {
        super(id, name, description, type, category, isEquipped, ownerId, modifiers)
        this.id = id
        this.name = `${name}`
        this.damage = damage
        this.type = type
        this.modifiers = modifiers
        this.isEquipped = isEquipped
        this.ownerId = ownerId
        this.requiredSkills = requiredSkills
    }

    wield(owner: PlayerModel | MonsterModel) {
        const { setNotification } = useInventory()
        if (!this) {
            console.error(`no weapon to wield!!`)
            return
        }
        const ownerHasRequiredSkills = () => {
            return this.requiredSkills.every((skillId) => {
                console.log(!Object.values(owner.skills).find((skillReq) => skillReq.id === skillId))
                if (!Object.values(owner.skills).find((skillReq) => skillReq.id === skillId)) {
                    console.log('no skill')
                    setNotification(`Missing required skill - ${skillId}`)
                    return false
                }
                return true
            })
        }

        if (!ownerHasRequiredSkills()) {
            return
        }
        if (owner.weapon) {
            // Unequip current weapon
            owner.weapon?.unequip(owner)
        }
        owner.weapon = this
        this.isEquipped = true

        // assign PASSIVE modifier to owner after equipping
        this.modifiers.forEach((modifier) => {
            if (modifier.type !== EModifierTypes.Passive) {
                return
            }
            modifier.owner = this
            modifier.use(owner)
        })
        // owner.status.updateCurrentStats(owner)
        console.log('wielded', this)
    }

    unequip(owner: PlayerModel | MonsterModel) {
        owner.weapon = null
        this.isEquipped = false
        console.log(`unequiped ${this.name}`)
        owner.status.list.forEach((status) => {
            if (status.origin === this) {
                owner.status.removeItem(status.id, owner)
            }
        })
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
            if (bodyPart.replaceAll(' ', '').toLowerCase() === this.bodyPart.toString().toLowerCase()) {
                return bodyPart
            }
        })
        if (!itemSlot) {
            console.log('item slot not found')
            return
        }
        //unequip current item
        owner.bodyParts[itemSlot].armor.item?.unequip(owner)
        console.log(`unequipped ${this.name}`)

        // equip the item
        owner.bodyParts[itemSlot].armor.item = this
        this.isEquipped = true
        console.log(`equiped ${this.name} on ${itemSlot}`)

        // assign modifier to owner after equipping
        this.modifiers.forEach((modifier) => {
            const foundModifier = !!owner.modifiers.list.find((item) => item.id === modifier.id)

            if (!foundModifier) {
                console.log(`Modifier: "${modifier.name}" was already added`)
                return
            }

            modifier.use(owner)
        })
        // TO DO apply/update stats
        // owner.modifiers.updateCurrentStats(owner)
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
        public baseValue: EDice = EDice.k6,
        public description: string = '',
        public type: string = '',
        public category: string = '',
        public item: string = ''
    ) {
        super(id, name, description, type, category)
        this.id = id
        this.item = item
        this.modifier = modifier
        this.baseValue = baseValue
    }

    quaff(person: PlayerModel | MonsterModel) {
        if (this.type === EPotionTypes.health) {
            if (person.currentStats.hp === person.stats.hp) {
                console.log(`${person.name} is max health`)
                return
            }
            const diceRoll = diceRollK6()
            const hpSum = person.currentStats.hp + diceRoll
            if (hpSum > person.stats.hp) {
                person.currentStats.hp = person.stats.hp
                console.log(`${person.name} has now ${person.currentStats.hp} hp`)
                person.inventory.removeItem(this.id)
                return
            }
            person.currentStats.hp += diceRoll
            person.inventory.removeItem(this.id)
            console.log(`${person.name} has now ${hpSum} hp`)
        }
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
