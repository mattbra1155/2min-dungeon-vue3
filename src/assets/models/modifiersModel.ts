import { IModifiers } from '@/interfaces/IModifiers'
import { ModifierItem } from '@/assets/models/modifierItemModel'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { EStats } from '@/enums/EStats'

class Modifiers implements IModifiers {
    constructor(public list: ModifierItem[] = []) {
        this.list = list
    }

    addItem(item: ModifierItem) {
        const itemExists = this.list.find((element: ModifierItem) => element.id === item.id)

        if (!itemExists) {
            this.list.push(item)
        }
    }

    removeItem(itemId: string) {
        const itemToRemove: ModifierItem | undefined = this.list.find((element: ModifierItem) => element.id === itemId)
        if (itemToRemove) {
            const itemIndex = this.list.findIndex((element: ModifierItem) => element.id === itemToRemove.id)
            this.list.splice(itemIndex)
            console.log('Removed modifier from list:', this.list)
        } else {
            console.log('Modifier to remove not found')
        }
    }

    updateModifiers(character: PlayerModel | MonsterModel, turn: number) {
        // check duration and remove
        this.list.forEach((modifier) => {
            if (!modifier.duration.isActive) {
                modifier.duration.max = turn + modifier.duration.max
                modifier.duration.current = turn
                return
            }
            modifier.duration.current++

            if (modifier.duration.current === modifier.duration.max) {
                this.removeItem(modifier.id)
                console.log(`Removed modifier: ${modifier.name}`)
                this.updateCurrentStats(character)
            }
        })
    }

    updateCurrentStats(character: PlayerModel | MonsterModel) {
        // remove all applied modifiers
        character.clearCurrentStats()
        // check and add new modifiers
        this.list.forEach((modifier) => {
            const mods = Object.entries(modifier.modifiers)
            mods.forEach((xxx) => {
                const statName = Object.values(EStats).find((stat) => stat === xxx[0])
                if (!statName) {
                    throw new Error('No statName')
                }
                if (xxx[0] === statName) {
                    // need to update new acutal stast instead of basic stats
                    character.currentStats[statName] += xxx[1]
                }
            })
        })
    }
}

export { Modifiers }
