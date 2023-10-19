import { IModifierItem } from '@/interfaces/IModifiers'
import { diceRollK100 } from '@/assets/scripts/diceRoll'
import { EModifierTypes } from '@/enums/EModifierTypes'
import { StatusAttackBonusDamage, StatusBonusStat, StatusDamageOverTime } from './statusItemModel'
import { statusList } from '@/assets/json/modifiers.json'
import { IAllStatusTypes } from '@/interfaces/IStatus'

class ModifierItem implements IModifierItem {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes | null,
        public ownerId: string | undefined,
        public chanceToApply: number | null,
        public statusId: string
    ) {
        this.id = id
        this.name = name
        this.type = type
        this.ownerId = ownerId
        this.chanceToApply = chanceToApply
        this.statusId = statusId
    }

    applyEffect(targetId: string, statusId: string) {
        const statusData = statusList.find((statusItem) => statusItem.id === statusId)
        console.log('apply')

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
        console.log(statusData)

        // const target = scene.value?.entityList.find((entity) => entity.id === targetId)
        // if (!target) {
        //     console.error('No target found')
        //     return
        // }
        switch (statusType) {
            case EModifierTypes.BonusStats:
                if (!statusData.bonusStatList) {
                    return
                }
                status = new StatusBonusStat(
                    statusData.id,
                    statusData.name,
                    statusType,
                    this.ownerId,
                    targetId,
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
                    this.ownerId,
                    targetId,
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
                    this.ownerId,
                    targetId,
                    {
                        isInfinite: statusData.duration?.isInfinite,
                        isActive: statusData.duration.isActive,
                        max: statusData.duration ? statusData.duration.max : undefined,
                        current: undefined,
                    },
                    statusData.updateOnBeginning
                )
        }
        if (!status) {
            console.error('no status created')
            return
        }
        // target.status.addItem(status, targetId)
        console.log(`Applied status: ${statusData.name}`)
    }

    use(targetId: string) {
        if (!targetId) {
            return
        }
        const roll = diceRollK100()
        console.log('roll', roll)

        // if (this.chanceToApply && roll <= this.chanceToApply) {
        this.applyEffect(targetId, this.statusId)
        // }
    }
}

export { ModifierItem }
