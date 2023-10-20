import { IAllStatusTypes, IStatus } from '@/interfaces/IStatus'
import { StatusBonusStat, StatusDamageOverTime } from './statusItemModel'
import { sceneManager } from './SceneManager'
import { EStats } from '@/enums/EStats'

class Status implements IStatus {
    constructor(public list: IAllStatusTypes[] = []) {
        this.list = list
    }

    addItem(status: IAllStatusTypes, characterId: string) {
        const itemExists = this.list.find((element) => element.id === status.id)

        if (!itemExists) {
            // TO DO get current turn to add

            // if (turnModel.turn && status.duration.max) {
            //     status.duration.max = turnModel.turn + status.duration.max
            // }
            this.list.push(status)
            this.updateCurrentStats(status, characterId, false)
        }
    }

    removeItem(statusId: string, characterId: string) {
        const statusToRemove = this.list.find((element) => element.id === statusId)
        if (statusToRemove) {
            const itemIndex = this.list.findIndex((element) => element.id === statusToRemove.id)

            this.list.splice(itemIndex)
            this.updateCurrentStats(statusToRemove, characterId, true)

            console.log('Removed status from list:', statusToRemove.name)
        } else {
            console.log('Status to remove not found')
        }
    }

    updateStatusList(characterId: string, turn: number) {
        // check duration and remove
        this.list.forEach((status) => {
            if (!status.duration.isActive) {
                return
            }

            console.log('here', status)
            // TO DO fix - now adds each time the func is called
            if (!status.duration.max) {
                return
            }
            status.duration.current = turn
            // status.duration.current++
            if (status.duration.current >= status.duration.max) {
                this.removeItem(status.id, characterId)
                console.log(`Removed status: ${status.name}`)
                return
            }

            console.log(status instanceof StatusDamageOverTime, status.updateOnBeginning)

            if (status instanceof StatusDamageOverTime && status.updateOnBeginning) {
                status.use()
            }
        })
    }

    updateCurrentStats(status: IAllStatusTypes, characterId: string, isNegative: boolean) {
        // const character = sceneManager.scene?.entityList.find((entity) => entity.id === characterId)
        // if (!character) {
        //     console.error('No character found')
        //     return
        // }
        // if (status instanceof StatusBonusStat) {
        //     Object.entries(status.bonusStatList).forEach((statusItem) => {
        //         const statName = Object.values(EStats).find((stat) => stat === statusItem[0])
        //         if (!statName) {
        //             throw new Error('No statName')
        //         }
        //         if (statusItem[0] === statName) {
        //             // need to update new acutal stast instead of basic stats
        //             if (isNegative) {
        //                 character.currentStats[statName] -= statusItem[1]
        //             } else {
        //                 character.currentStats[statName] += statusItem[1]
        //             }
        //         }
        //     })
        // }
    }
}

export { Status }