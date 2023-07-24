import { reactive, toRefs } from 'vue'
import localforage from 'localforage'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'
import { Armor, Potion, Weapon } from '@/assets/models/itemsModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { Inventory } from '@/assets/models/inventoryModel'
import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'
import { Modifier } from '@/assets/models/modifierModel'
import { EModifierTypes } from '@/enums/EModifierTypes'
import { IPlayer } from '@/interfaces/IPlayer'
const { head, leftArm, rightArm, torso, leftLeg, rightLeg } = bodyPartsModel

interface iPlayerState {
    player: PlayerModel
    initPlayer: PlayerModel
}
const state: iPlayerState = reactive({
    initPlayer: new PlayerModel(),
    player: new PlayerModel(),
})

export const usePlayer = () => {
    const setPlayer = async (payload: PlayerModel) => {
        await storePlayerModel()
        state.player = payload
        await localforage.setItem('player', JSON.stringify(payload))
        return state.player
    }

    const createPlayer = (payload: PlayerModel | null) => {
        // localforage.removeItem('player')
        // state.player = state.initPlayer
        // console.log(state.initPlayer)
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
            const mmm = new Modifier(999, 'test', EModifierTypes.Passive, { hp: 10 })
            state.player.modifiers.push(mmm)
            console.log(state.player)
            if (weapon instanceof Weapon) {
                state.player.weapon = weapon
            }
            // TO FIX: When saving Player the Class is lost. Need to find a way to restore it
            localforage.setItem('player', JSON.stringify(state.player))
        }
    }

    const storePlayerModel = async () => {
        try {
            const result = await localforage.setItem('initPlayer', JSON.stringify(state.initPlayer))
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
        const payload: string | null = await localforage.getItem('initPlayer')
        if (payload) {
            const playerData = JSON.parse(payload)
            Object.assign(state.player, playerData)
            console.log('Player reset')
        } else {
            console.log('Player reset: Cant get initPlayer from storage')
        }
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
