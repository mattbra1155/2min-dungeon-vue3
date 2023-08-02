import { reactive, toRefs } from 'vue'
import localforage from 'localforage'
import { EItemCategory } from '@/enums/ItemCategory'
import { Armor, Potion, Weapon } from '@/assets/models/itemsModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { Inventory } from '@/assets/models/inventoryModel'
import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'
import { ModifierItem } from '@/assets/models/modifierItemModel'
import { Modifiers } from '@/assets/models/modifiersModel'

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
        if (payload) {
            state.player = Object.assign(state.player, payload)
            state.player.currentStats = JSON.parse(JSON.stringify(state.player.stats))

            state.player.isAlive = true

            const stringifiedPlayer = JSON.stringify(state.player)
            localforage.setItem('player', stringifiedPlayer)
            return state.player
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
                const newPlayer: PlayerModel = Object.assign(playerClass, playerData)
                // create new inventory class
                const inventory = new Inventory()
                // create new modifiers class
                const modifiers = new Modifiers()

                newPlayer.inventory = inventory
                newPlayer.modifiers = modifiers

                const populateModifiers = () => {
                    console.log(playerData.modifiers)

                    playerData.modifiers.list.forEach((modifier: ModifierItem) => newPlayer.modifiers.addItem(modifier))
                }

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
                populateModifiers()
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
