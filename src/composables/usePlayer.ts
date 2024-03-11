import { reactive, toRefs } from 'vue'
import localforage from 'localforage'
import { EItemCategory } from '@/enums/ItemCategory'
import { Armor, Potion, Weapon } from '@/assets/models/itemsModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { Inventory } from '@/assets/models/inventoryModel'
import { AllItemTypes } from '@/interfaces/IItem'
import { ModifierItem } from '@/assets/models/modifierItemModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { Status } from '@/assets/models/statusModel'

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

    const createPlayer = async (payload: PlayerModel | null) => {
        if (payload) {
            state.player = Object.assign(state.player, payload)
            state.player.currentStats = JSON.parse(JSON.stringify(state.player.stats))

            state.player.isAlive = true

            const stringifiedPlayer = JSON.stringify(state.player)
            await localforage.setItem('player', stringifiedPlayer)
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
                const status = new Status()
                newPlayer.inventory = inventory
                newPlayer.modifiers = modifiers
                newPlayer.status = status

                newPlayer.inventory.encumbrance = playerData.inventory.encumbrance

                const populateModifiers = () => {
                    playerData.modifiers.list.forEach((modifier: ModifierItem) => newPlayer.modifiers.addItem(modifier))
                }

                const populateInventoryItemClasses = () => {
                    if (!playerData.inventory) {
                        return
                    }
                    newPlayer.inventory.inventory = playerData.inventory.inventory.map((item: AllItemTypes) => {
                        if (item.category === EItemCategory.Weapon) {
                            const weapon = new Weapon()
                            const newWeapon = Object.assign(weapon, item)
                            return newWeapon as Weapon
                        } else if (item.category === EItemCategory.Armor) {
                            const armor = new Armor()
                            const newArmor = Object.assign(armor, item)
                            return newArmor as Armor
                        } else if (item.category === EItemCategory.Potion) {
                            const potion = new Potion()
                            const newPotion = Object.assign(potion, item)
                            return newPotion as Potion
                        } else {
                            return item
                        }
                    })

                    // recreate ModifierItem class
                    newPlayer.inventory.inventory.forEach((item) => {
                        item.modifiers = item.modifiers.map((itemModifier) => {
                            const modifier = new ModifierItem(
                                itemModifier.id,
                                itemModifier.name,
                                itemModifier.type,
                                itemModifier.owner,
                                itemModifier.chanceToApply,
                                itemModifier.statusId
                            )
                            return modifier
                        })
                        console.log(item.modifiers)
                    })
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
        const player = new PlayerModel()
        Object.assign(state.player, player)
        console.log(state.player)

        //     const payload: string | null = await localforage.getItem('initPlayer')
        //     if (payload) {
        //         const playerData = JSON.parse(payload)
        //         Object.assign(state.player, playerData)
        //         console.log('Player reset')
        //     } else {
        //         console.log('Player reset: Cant get initPlayer from storage')
        //     }
    }

    const deadPlayer = () => {
        state.player.isAlive = false
        localforage.removeItem('player')
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
