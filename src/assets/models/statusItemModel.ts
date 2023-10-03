import { EModifierTypes } from '@/enums/EModifierTypes'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from './playerModel'
import { IStatusBonusDamage, IStatusDamageOverTime, IStatusItem } from '@/interfaces/IStatus'
import { AllItemTypes } from '@/interfaces/IItem'
import { PersonModel } from './personModel'

class StatusItem implements IStatusItem {
    constructor(
        public id: string = `status-${self.crypto.randomUUID()}`,
        public name: string,
        public type: EModifierTypes,
        public origin: PlayerModel | MonsterModel | AllItemTypes | undefined,
        public target: PersonModel | undefined,
        public updateOnBeginning: boolean
    ) {
        this.id = id
        this.updateOnBeginning = updateOnBeginning
    }

    use() {
        // TO DO
        if (this.type === EModifierTypes.DamageOverTime) {
            if (!this.target) {
                return
            }
            this.target.currentStats.hp -= 1
        }
    }
}

class StatusDamageOverTime extends StatusItem implements IStatusDamageOverTime {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public origin: PlayerModel | MonsterModel | AllItemTypes | undefined,
        public target: PersonModel,
        public duration: {
            isActive: boolean
            current: number | undefined
            max: number | undefined
        },
        public updateOnBeginning: boolean
    ) {
        super(id, name, type, origin, target, updateOnBeginning)
        this.duration = duration
    }
}

class StatusAttackBonusDamage extends StatusItem implements IStatusBonusDamage {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public origin: PlayerModel | MonsterModel | AllItemTypes | undefined,
        public target: PersonModel | undefined,
        public updateOnBeginning: boolean,
        public bonusDamage: number
    ) {
        super(id, name, type, origin, target, updateOnBeginning)
        this.bonusDamage = bonusDamage
    }

    use() {
        return this.bonusDamage
    }
}

export { StatusItem, StatusDamageOverTime, StatusAttackBonusDamage }
