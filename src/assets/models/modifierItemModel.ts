import { IModifierItem } from '@/interfaces/IModifiers'
import { MonsterModel } from '@/assets/models/monsterModel'
import { diceRollK100 } from '@/helpers/diceRoll'
import { EModifierTypes } from '@/enums/EModifierTypes'
import { StatusAttackBonusDamage, StatusBonusStat, StatusDamageOverTime } from './statusItemModel'
import { statusList } from '@/assets/json/modifiers.json'
import { AllItemTypes } from '@/interfaces/IItem'
import { IAllStatusTypes } from '@/interfaces/IStatus'
import { useFeedStore } from '@/stores/useFeed'
import { IPlayer } from '@/interfaces/IPlayer'
import { useTurnStore } from '@/stores/useTurn'

class ModifierItem implements IModifierItem {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes | null,
        public owner: IPlayer | MonsterModel | AllItemTypes | undefined,
        public chanceToApply: number | null,
        public statusId: string
    ) {
        this.id = id
        this.name = name
        this.type = type
        this.owner = owner
        this.chanceToApply = chanceToApply
        this.statusId = statusId
    }

    applyEffect(target: IPlayer | MonsterModel, statusId: string) {
        const turnStore = useTurnStore()
        const feedStore = useFeedStore()
        const statusData = statusList.find((statusItem) => statusItem.id === statusId)
        if (!statusData) {
            console.error('No modifier found')
            return
        }

        const statusType = Object.values(EModifierTypes).find((type) => type === statusData.type)

        if (!statusType) {
            console.error(`statusType undefined`)
            return
        }

        let status: IAllStatusTypes | undefined = undefined
        switch (statusType) {
            case EModifierTypes.BonusStats:
                if (!statusData.bonusStatList) {
                    return
                }
                status = new StatusBonusStat(
                    statusData.id,
                    statusData.name,
                    statusType,
                    this.owner,
                    target,
                    {
                        isInfinite: statusData.duration.isInfinite,
                        isActive: statusData.duration.isActive,
                        max: statusData.duration.max,
                        current: undefined,
                    },
                    statusData.updateOnBeginning,
                    statusData.bonusStatList
                )
                break

            case EModifierTypes.AttackBonusDamage:
                status = new StatusAttackBonusDamage(
                    statusData.id,
                    statusData.name,
                    statusType,
                    this.owner,
                    target,
                    {
                        isInfinite: statusData.duration.isInfinite,
                        isActive: statusData.duration.isActive,
                        max: statusData.duration.max,
                        current: undefined,
                    },
                    statusData.updateOnBeginning,
                    1
                )
                break
            case EModifierTypes.DamageOverTime:
                status = new StatusDamageOverTime(
                    statusData.id,
                    statusData.name,
                    statusType,
                    this.owner,
                    target,
                    {
                        isInfinite: statusData.duration?.isInfinite,
                        isActive: statusData.duration.isActive,
                        max: statusData.duration.max ? statusData.duration.max + turnStore.turnNumber : undefined,
                        current: undefined,
                    },
                    statusData.updateOnBeginning
                )
        }

        if (!status) {
            console.error('no status created')
            return
        }
        target.status.addItem(status, target)
        feedStore.setBattleFeedItem(`${target.name} gains status: ${status.name} `)
        console.log(`Applied status: ${status.name}`)
    }

    use(target: any) {
        if (!target) {
            return
        }
        const roll = diceRollK100()
        console.log('roll', roll)

        // if (this.chanceToApply && roll <= this.chanceToApply) {
        this.applyEffect(target, this.statusId)
        // }
    }
}

export { ModifierItem }
function useTurn() {
    throw new Error('Function not implemented.')
}
