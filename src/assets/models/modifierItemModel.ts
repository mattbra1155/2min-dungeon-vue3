import { IModifierItem } from '@/interfaces/IModifiers'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from './playerModel'
import { diceRollK100 } from '@/assets/scripts/diceRoll'
import { EModifierTypes } from '@/enums/EModifierTypes'
import { StatusAttackBonusDamage, StatusItem } from './statusItemModel'
import { statusList } from '@/assets/json/modifiers.json'
import { AllItemTypes } from '@/interfaces/IItem'
import { PersonModel } from './personModel'
import { IAllStatusTypes } from '@/interfaces/IStatus'

class ModifierItem implements IModifierItem {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes | null,
        public owner: PlayerModel | MonsterModel | AllItemTypes | undefined,
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

    applyEffect(target: PersonModel, statusId: string) {
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
        if (statusType === EModifierTypes.AttackBonusDamage) {
            status = new StatusAttackBonusDamage(this.id, this.name, statusType, this.owner, target, false, 1)
        }
        console.log('satusType', statusType)

        if (!status) {
            console.error('no status created')
            return
        }
        target.status.addItem(status)
        console.log(`Applied status: ${status.name}`)
    }

    use(target: PersonModel) {
        if (!target) {
            return
        }
        console.log('this', this)

        const roll = diceRollK100()

        if (this.chanceToApply && roll <= this.chanceToApply) {
            this.applyEffect(target, this.statusId)
        }
    }
}

export { ModifierItem }
