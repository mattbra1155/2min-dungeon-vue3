import { Character } from '@/assets/models/personModel'
import { BodyParts } from '@/interfaces/BodyParts'
import { Item, Weapon } from '@/interfaces/Item'
import { Player } from '@/interfaces/Player'

class PlayerModel extends Character implements Player {
    name: string
    race: string
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
    weapon: Weapon
    description: string
    inventory: Weapon[]
    bodyParts: BodyParts
    isAlive: Boolean
    player: boolean
    constructor(
        name: string,
        race: string,
        hp: number,
        melee: number,
        ranged: number,
        dexterity: number,
        strength: number,
        thoughtness: number,
        speed: number,
        initiative: number,
        attacks: number,
        inteligence: number,
        willPower: number,
        charisma: number,
        weapon: Weapon,
        description: string,
        inventory: Array<Weapon>,
        bodyParts: BodyParts,
        isAlive: Boolean,
        player: Boolean
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
            description
        )
        this.name = name
        this.race = race
        this.hp = hp
        this.melee = melee
        this.ranged = ranged
        this.dexterity = dexterity
        this.strength = strength
        this.thoughtness = thoughtness
        this.speed = speed
        this.initiative = initiative
        this.attacks = attacks
        this.inteligence = inteligence
        this.willPower = willPower
        this.charisma = charisma
        this.weapon = weapon
        this.inventory = inventory
        this.description = description
        this.bodyParts = {
            head: {
                name: 'Head',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            'right arm': {
                name: 'Right arm',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            'left arm': {
                name: 'Left arm',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            torso: {
                name: 'Torso',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            'right leg': {
                name: 'Right leg',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            'left leg': {
                name: 'Left leg',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
        }
        this.isAlive = true
        this.player = true
    }

    equipItem(item) {
        switch (item.category) {
            case 'armor': {
                let playerBodyPartKeys = Object.keys(this.bodyParts)

                const getBodyPart = playerBodyPartKeys.find(
                    (playerBodyPart) => {
                        if (playerBodyPart === item.bodyPart) {
                            return playerBodyPart
                        }
                    }
                )
                this.bodyParts[getBodyPart].armor.item = item
                this.bodyParts[getBodyPart].armor.armorPoints = item.armorPoints
                break
            }
            case 'weapon':
                this.weapon = item
                break

            case 'potion':
                //todo
                this.hp += item.modifier
                break

            case 'utility':
                //todo
                this.weapon = item
        }
    }

    pickUpItem(item: Item) {
        this.inventory.push(item)
    }
}

export { PlayerModel }
