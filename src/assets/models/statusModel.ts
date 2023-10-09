import { IAllStatusTypes, IStatus, IStatusItem } from '@/interfaces/IStatus'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'
import { EStats } from '@/enums/EStats'
import { StatusBonusStat, StatusDamageOverTime } from './statusItemModel'
import { EModifierTypes } from '@/enums/EModifierTypes'

class Status implements IStatus {
    constructor(public list: IAllStatusTypes[] = []) {
        this.list = list
    }

    addItem(item: IAllStatusTypes) {
        const itemExists = this.list.find((element) => element.id === item.id)

        if (!itemExists) {
            this.list.push(item)
        }
    }

    removeItem(itemId: string) {
        const itemToRemove = this.list.find((element) => element.id === itemId)
        if (itemToRemove) {
            const itemIndex = this.list.findIndex((element) => element.id === itemToRemove.id)
            console.log(itemToRemove, itemIndex)

            this.list.splice(itemIndex)
            console.log('Removed modifier from list:', this.list)
        } else {
            console.log('Modifier to remove not found')
        }
    }

    updateStatusList(character: PlayerModel | MonsterModel, turn: number) {
        // check duration and remove
        this.list.forEach((status) => {
            if (!status.duration) {
                this.removeItem(status.id)
                return
            }
            if (!status.duration.isActive) {
                return
            }
            console.log(status)

            if (status.duration.max) {
                status.duration.max = turn + status.duration.max
            }
            status.duration.current = turn
            status.duration.current++
            if (status.duration.current === status.duration.max) {
                this.removeItem(status.id)
                console.log(`Removed status: ${status.name}`)
                // apply/update stats
            }
            if (status instanceof StatusDamageOverTime) {
                status.use()
            }
            this.updateCurrentStats(character)
        })
    }

    updateCurrentStats(character: PlayerModel | MonsterModel) {
        // remove all applied modifiers
        character.clearCurrentStats()
        // check and add new modifiers
        this.list.forEach((status) => {
            if (status instanceof StatusBonusStat) {
                Object.entries(status.bonusStatList).forEach((statusItem) => {
                    const statName = Object.values(EStats).find((stat) => stat === statusItem[0])
                    if (!statName) {
                        throw new Error('No statName')
                    }
                    if (statusItem[0] === statName) {
                        // need to update new acutal stast instead of basic stats
                        character.currentStats[statName] += statusItem[1]
                    }
                })
            }
        })
    }
}

export { Status }
