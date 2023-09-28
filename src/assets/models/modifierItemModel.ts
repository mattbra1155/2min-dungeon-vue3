import { IModifierItem } from '@/interfaces/IModifiers'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from './playerModel'
import { diceRollK100 } from '@/assets/scripts/diceRoll'
import { EModifierTypes } from '@/enums/EModifierTypes'
import { StatusItem } from './statusItemModel'
import { statusList } from '@/assets/json/modifiers.json'
import { AllItemTypes } from '@/interfaces/IItem'

class ModifierItem implements IModifierItem {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes | null,
        public owner: PlayerModel | MonsterModel | undefined,
        public target: PlayerModel | MonsterModel | undefined,
        public chanceToApply: number | null,
        public statusId: string
    ) {
        this.id = id
        this.name = name
        this.type = type
        this.owner = owner
        this.target = target
        this.chanceToApply = chanceToApply
        this.statusId = statusId
    }

    applyEffect(target: PlayerModel | MonsterModel, statusId: string) {
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
        console.log('satusType', statusType)
        const status = new StatusItem(
            `status-${self.crypto.randomUUID()}`,
            this.name,
            statusType,
            undefined,
            target,
            {
                isActive: statusData.duration.isActive,
                current: undefined,
                max: statusData.duration.max,
            },
            statusData.updateOnBeginning
        )

        target.status.addItem(status)
        console.log(`Applied status: ${status.name}`)
    }

    use(target: PlayerModel | MonsterModel) {
        if (!target) {
            return
        }
        console.log('here')

        const roll = diceRollK100()

        if (this.chanceToApply && roll <= this.chanceToApply) {
            this.applyEffect(target, this.statusId)
        }
    }
}

export { ModifierItem }
