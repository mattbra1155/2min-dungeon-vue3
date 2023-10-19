import { Armor, Potion, Weapon } from './itemsModel'
import { EItemCategory } from '@/enums/ItemCategory'
import { AllItemTypes } from '@/interfaces/IItem'
import localforage from 'localforage'
import { ModifierItem } from './modifierItemModel'
import { Status } from './statusModel'
import { Inventory } from './inventoryModel'
import { Modifiers } from './modifiersModel'
import { PlayerModel } from './playerModel'

class PlayerManager {
    public player: PlayerModel
    public initPlayer: PlayerModel
    constructor() {
        this.player = new PlayerModel()
        this.initPlayer = new PlayerModel()
    }

    createPlayer = (payload: PlayerModel | null) => {
        if (payload) {
            this.player = Object.assign(this.player, payload)
            this.player.stats = structuredClone(this.initPlayer.stats)
            this.player.currentStats = structuredClone(this.initPlayer.stats)
            this.player.isAlive = true

            console.log(this.player)

            localforage.setItem('player', JSON.stringify(this.player))
            return this.player
        }
    }

    setPlayer = async (payload: PlayerModel) => {
        this.player = payload
        await this.storePlayerModel()
        await localforage.setItem('player', JSON.stringify(payload))
    }

    storePlayerModel = async () => {
        try {
            const result = await localforage.setItem('initPlayer', JSON.stringify(this.player))
            return result
        } catch (error: any) {
            throw Error(error)
        }
    }

    fetchPlayer = async () => {
        try {
            const result: string | null = await localforage.getItem('player')

            if (result) {
                const playerData: PlayerModel = JSON.parse(result)
                console.log(this.player)
                const playerClass = this.player
                // assign data to player class
                const newPlayer: PlayerModel = Object.assign(playerClass, playerData)
                console.log(this.player.id, newPlayer.id)

                console.log(newPlayer)
                // create new inventory class
                const inventory = new Inventory()
                // create new modifiers class
                const modifiers = new Modifiers()
                const status = new Status()
                newPlayer.inventory = inventory
                newPlayer.modifiers = modifiers
                newPlayer.status = status

                const populateModifiers = () => {
                    console.log(playerData.modifiers)

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
                                itemModifier.ownerId,
                                itemModifier.chanceToApply,
                                itemModifier.statusId
                            )
                            return modifier
                        })
                    })
                }
                populateInventoryItemClasses()
                populateModifiers()
                console.log('pl', newPlayer)

                this.player = newPlayer
                return this.player
            }
        } catch (error: any) {
            throw Error(error)
        }
    }

    resetPlayer = async () => {
        const payload: string | null = await localforage.getItem('initPlayer')
        if (payload) {
            const playerData = JSON.parse(payload)
            Object.assign(this.player, playerData)
            console.log('Player reset')
        } else {
            console.log('Player reset: Cant get initPlayer from storage')
        }
    }

    deadPlayer = () => {
        this.player.isAlive = false
        this.resetPlayer()
    }
}

const playerManager = new PlayerManager()
const player = playerManager.player

export { playerManager, player }
