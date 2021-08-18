class Item {
    constructor(id, name, description, type, category) {
        this.name = name
        this.description = description
        this.type = type
        this.id = id
        this.category = category
    }
}

class Weapon extends Item {
    constructor(name, description, damage, category, type, prefix, modifier) {
        super(name, description, category)
        this.damage = damage
        this.type = type
        this.prefix = prefix
        this.modifier = modifier
    }

    get fullName() {
        return this.name = `${this.prefix.name} ${this.name}`
    }

    addModifier(baseItem, prefix) {
        let modifier
        const mods = baseItem.modifier === undefined ? 0 : baseItem.modifier
        const prefixMod = prefix.modifier
        modifier = mods + prefixMod

        return modifier
    }
}

class Armor extends Item {
    constructor(
        name,
        description,
        modifier,
        bodyPart,
        type,
        item,
        category,
        prefix
    ) {
        super(name, description, category)
        this.modifier = modifier
        this.bodyPart = bodyPart
        this.type = type
        this.item = item
        this.prefix = prefix
    }
}

class Potion extends Item {
    constructor(name, modifier, description, category, item, prefix) {
        super(name, description, category)
        this.item = item
        this.prefix = prefix
    }
}

class Utility extends Item {
    constructor(name, description, category) {
        super(name, description, category)
    }
}

let items = {
    weapons: [
        new Weapon('Old sword', 'An old rusty sword'),
        new Weapon('Rusty mace', 'A rusty mace'),
        new Weapon('Magic staff', 'a magic staff with a blue stone on top'),
        new Weapon('Magic sword', 'Sword imbuded with some sort of magic', 0),
        new Weapon('Magic mace', 'Heavy magic mace', 0)
    ],
    armors: {
        head: [new Armor('Rusty helmet', 'an old and worn helmet', 6)],
        hands: [],
        torso: [],
        legs: []
    },
    potions: [
        new Potion(
            'Small health potion',
            2,
            'A small healing potion that recovers 10hp'
        )
    ],
    utility: [
        new Utility(
            'Torch',
            'A torch that you can use to light dark areas. It also could be a weapon'
        )
    ]
}

export { Weapon, Armor, Potion, Utility, items }
