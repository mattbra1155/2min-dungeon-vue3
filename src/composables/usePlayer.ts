import { reactive, toRefs } from 'vue'
import localforage from 'localforage'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'
import { Armor, Potion, Weapon } from '@/assets/models/itemsModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { Inventory } from '@/assets/models/inventoryModel'
import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'
const { head, leftArm, rightArm, torso, leftLeg, rightLeg } = bodyPartsModel

const playerModel: PlayerModel = {
    name: 'Charname',
    race: 'dwarf',
    profession: '',
    stats: {
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
    bodyParts: {
        head,
        leftArm,
        rightArm,
        torso,
        leftLeg,
        rightLeg,
    },
    weapon: null,
    description: '',
    inventory: new Inventory(),
    isAlive: true,
    player: true,
}

interface iPlayerState {
    player: PlayerModel
    initPlayer: PlayerModel
}
const state: iPlayerState = reactive({
    initPlayer: {
        id: 0,
        name: 'Charname',
        race: 'dwarf',
        profession: '',
        stats: {
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
        bodyParts: {
            head,
            leftArm,
            rightArm,
            torso,
            leftLeg,
            rightLeg,
        },
        weapon: null,
        description: '',
        inventory: new Inventory(),
        isAlive: true,
        player: true,
    },
    player: {
        id: 0,
        name: 'Charname',
        race: 'dwarf',
        profession: '',
        stats: {
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
        bodyParts: {
            head,
            leftArm,
            rightArm,
            torso,
            leftLeg,
            rightLeg,
        },
        weapon: null,
        description: '',
        inventory: new Inventory(),
        isAlive: true,
        player: true,
    },
})

export const usePlayer = () => {
    const setPlayer = async (payload: PlayerModel) => {
        await storePlayerModel()
        state.player = payload
        await localforage.setItem('player', JSON.stringify(payload))
        return state.player
    }

    const createPlayer = (payload: PlayerModel | null) => {
        if (payload) {
            state.player = Object.assign(state.player, payload)
            const inventory = new Inventory()
            state.player.inventory = inventory
            state.player.isAlive = true
            const weapon = new ItemGenerator().createItem(EItemCategory.Weapon)
            const armor = new ItemGenerator().createItem(EItemCategory.Armor)
            const armor2 = new ItemGenerator().createItem(EItemCategory.Armor)
            state.player.inventory.addItem(weapon)
            state.player.inventory.addItem(armor)
            state.player.inventory.addItem(armor2)
            if (weapon instanceof Weapon) {
                state.player.weapon = weapon
            }
            // TO FIX: When saving Player the Class is lost. Need to find a way to restore it
            localforage.setItem('player', JSON.stringify(state.player))
        }
    }

    const storePlayerModel = async () => {
        try {
            const result = await localforage.setItem('initPlayer', playerModel)
            return result
        } catch (error: any) {
            throw Error(error)
        }
    }

    const fetchPlayer = async () => {
        try {
            const result: string | null = await localforage.getItem('player')

            if (result) {
                const playerData = JSON.parse(result)
                //create new EMPTY player class
                const playerClass = new PlayerModel()
                // assign data to player class
                const newPlayer = Object.assign(playerClass, playerData)
                // create new inventory class
                const inventory = new Inventory()

                newPlayer.inventory = inventory

                const populateInventoryItemClasses = () => {
                    if (!playerData.inventory) {
                        return
                    }
                    newPlayer.inventory.inventory = playerData.inventory.inventory.map(
                        (item: Weapon | Armor | Potion) => {
                            if (item.category === EItemCategory.Weapon) {
                                const weapon = new Weapon()
                                const newWeapon = Object.assign(weapon, item)
                                return newWeapon as IWeapon
                            } else if (item.category === EItemCategory.Armor) {
                                const armor = new Armor()
                                const newArmor = Object.assign(armor, item)
                                return newArmor as IArmor
                            } else if (item.category === EItemCategory.Potion) {
                                const potion = new Potion()
                                const newPotion = Object.assign(potion, item)
                                return newPotion as IPotion
                            } else {
                                return item
                            }
                        }
                    )
                }
                populateInventoryItemClasses()
                return newPlayer
            }
        } catch (error: any) {
            throw Error(error)
        }
    }

    const resetPlayer = async () => {
        state.player = (await localforage.getItem('initPlayer')) as PlayerModel
    }

    const deadPlayer = () => {
        state.player.isAlive = false
        resetPlayer()
    }

    return {
        ...toRefs(state),
        setPlayer,
        createPlayer,
        fetchPlayer,
        deadPlayer,
        resetPlayer,
    }
}
