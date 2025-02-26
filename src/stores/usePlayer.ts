import localforage from 'localforage'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { EItemCategory } from '@/enums/ItemCategory'
import { Armor, Potion, Weapon } from '@/assets/models/itemsModel'
import { Inventory } from '@/assets/models/inventoryModel'
import { AllItemTypes } from '@/interfaces/IItem'
import { ModifierItem } from '@/assets/models/modifierItemModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { Status } from '@/assets/models/statusModel'
import { IPlayer } from '@/interfaces/IPlayer'
import { PlayerModel } from '@/assets/models/playerModel'

export const usePlayerStore = defineStore('player', () => {
    const initPlayer = ref<IPlayer>()
    const player = ref<IPlayer>()

    const setPlayer = async (payload: IPlayer) => {
        await storeIPlayer()
        player.value = payload
        await localforage.setItem('player', JSON.stringify(payload))
        return player.value
    }

    const createPlayer = async (payload: IPlayer | null) => {
        if (!payload) {
            return
        }
        player.value = new PlayerModel()
        player.value = Object.assign(player.value, payload)
        player.value.currentStats = JSON.parse(JSON.stringify(player.value.stats))

        player.value.isAlive = true

        const stringifiedPlayer = JSON.stringify(player.value)
        await localforage.setItem('player', stringifiedPlayer)
        return player.value
    }

    const storeIPlayer = async () => {
        try {
            const result = await localforage.setItem('initPlayer', JSON.stringify(initPlayer.value))
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
                const newPlayer: IPlayer = Object.assign(playerClass, playerData)
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
        if (!player.value) {
            console.error('No Player')
            return
        }
        const IPlayer = new PlayerModel()
        Object.assign(player.value, IPlayer)
    }

    const deadPlayer = () => {
        if (!player.value) {
            console.error('No Player')
            return
        }
        player.value.isAlive = false
        localforage.removeItem('player')
        resetPlayer()
    }

    return {
        player,
        initPlayer,
        setPlayer,
        createPlayer,
        fetchPlayer,
        deadPlayer,
        resetPlayer,
    }
})
