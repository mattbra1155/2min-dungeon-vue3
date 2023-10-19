import { IModifiers } from '@/interfaces/IModifiers'
import { ModifierItem } from '@/assets/models/modifierItemModel'

class Modifiers implements IModifiers {
    constructor(public list: ModifierItem[] = []) {
        this.list = list
    }

    addItem(item: ModifierItem) {
        const itemExists = this.list.find((element) => element.id === item.id)

        if (!itemExists) {
            this.list.push(item)
        }
    }

    removeItem(itemId: string) {
        const itemToRemove = this.list.find((element) => element.id === itemId)
        if (itemToRemove) {
            const itemIndex = this.list.findIndex((element) => element.id === itemToRemove.id)
            this.list.splice(itemIndex)
            console.log('Removed modifier from list:', this.list)
        } else {
            console.log('Modifier to remove not found')
        }
    }

    // updateModifiers(character: PlayerModel | MonsterModel, turn: number) {
    //     // check duration and remove
    //     this.list.forEach((modifier) => {
    //         if (status.duration.current === status.duration.max) {
    //             this.removeItem(status.id)
    //             console.log(`Removed status: ${status.name}`)
    //             // TO DO apply/update stats
    //             // this.updateCurrentStats(character)
    //         }
    //     })
    // }

    // updateCurrentStats(character: PlayerModel | MonsterModel) {
    //     // remove all applied modifiers
    //     character.clearCurrentStats()
    //     // check and add new modifiers
    //     this.list.forEach((modifier) => {
    //         const mods = Object.entries(modifier)
    //         mods.forEach((xxx) => {
    //             const statName = Object.values(EStats).find((stat) => stat === xxx[0])
    //             if (!statName) {
    //                 throw new Error('No statName')
    //             }
    //             if (xxx[0] === statName) {
    //                 // need to update new acutal stast instead of basic stats
    //                 character.currentStats[statName] += xxx[1]
    //             }
    //         })
    //     })
    // }
}

export { Modifiers }
