import { EModifierTypes } from '@/enums/EModifierTypes'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from './playerModel'
import { IStatusItem } from '@/interfaces/IStatus'
import { AllItemTypes } from '@/interfaces/IItem'

class StatusItem implements IStatusItem {
    constructor(
        public id: string = `status-${self.crypto.randomUUID()}`,
        public name: string,
        public type: EModifierTypes,
        public origin: PlayerModel | MonsterModel | AllItemTypes | undefined,
        public target: PlayerModel | MonsterModel | undefined,
        public duration: {
            isActive: boolean
            current: number | undefined
            max: number | undefined
        },
        public updateOnBeginning: boolean
    ) {
        this.id = id
        this.duration = duration
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

export { StatusItem }
