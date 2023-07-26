import { IModifiers } from '@/interfaces/IModifiers'
import { ModifierItem } from '@/assets/models/modifierItemModel'
import { IMonster } from '@/interfaces/IMonster'
import { PlayerModel } from './playerModel'
import { EStats } from '@/enums/EStats'
import { IStats } from '@/interfaces/IStats'

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

    removeItem(itemId: number) {
        const itemToRemove: ModifierItem | undefined = this.list.find((element: ModifierItem) => element.id === itemId)
        if (itemToRemove) {
            const itemIndex = this.list.findIndex((element: ModifierItem) => element.id === itemToRemove.id)
            this.list.splice(itemIndex)
            console.log('Removed modifier from list:', this.list)
        } else {
            console.log('Modifier to remove not found')
        }
    }

    updateStats(character: PlayerModel | IMonster) {
        this.list.forEach((modifier) => {
            const mods = Object.entries(modifier.modifiers)
            mods.forEach((xxx) => {
                const statName = Object.values(EStats).find((stat) => stat === xxx[0])
                if (!statName) {
                    throw new Error('No statName')
                }
                if (xxx[0] === statName) {
                    character.stats[statName] += xxx[1]
                }
            })
        })
    }
}

export { Modifiers }
