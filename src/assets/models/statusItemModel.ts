import { EModifierTypes } from '@/enums/EModifierTypes'
import { MonsterModel } from '@/assets/models/monsterModel'
import { IStatusBonusDamage, IStatusBonusStats, IStatusDamageOverTime, IStatusItem } from '@/interfaces/IStatus'
import { AllItemTypes } from '@/interfaces/IItem'
import { EStats } from '@/enums/EStats'
import { IStats } from '@/interfaces/IStats'
import { useFeedStore } from '@/stores/useFeed'
import { IPlayer } from '@/interfaces/IPlayer'

class StatusItem implements IStatusItem {
    constructor(
        public id: string = `status-${self.crypto.randomUUID()}`,
        public name: string,
        public type: EModifierTypes,
        public origin: IPlayer | MonsterModel | AllItemTypes | undefined,
        public target: IPlayer | MonsterModel | undefined,
        public duration: {
            isInfinite: boolean
            isActive: boolean
            current: number | undefined
            max: number | undefined
        },
        public updateOnBeginning: boolean
    ) {
        this.id = id
        this.updateOnBeginning = updateOnBeginning
    }
}

class StatusBonusStat extends StatusItem implements IStatusBonusStats {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public origin: IPlayer | MonsterModel | AllItemTypes | undefined,
        public target: IPlayer | MonsterModel,
        public duration: {
            isInfinite: boolean
            isActive: boolean
            current: number | undefined
            max: number | undefined
        },
        public updateOnBeginning: boolean,
        public bonusStatList: Partial<IStats>
    ) {
        super(id, name, type, origin, target, duration, updateOnBeginning)
    }
    use(target: IPlayer | MonsterModel) {
        Object.entries(this.bonusStatList).forEach((bonusStat) => {
            const statName = Object.values(EStats).find((stat) => stat === bonusStat[0])
            if (!statName) {
                throw new Error('No statName')
            }
            if (bonusStat[0] === statName) {
                // need to update new acutal stast instead of basic stats
                target.currentStats[statName] += bonusStat[1]
            }
        })
    }
}

class StatusDamageOverTime extends StatusItem implements IStatusDamageOverTime {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public origin: IPlayer | MonsterModel | AllItemTypes | undefined,
        public target: IPlayer | MonsterModel,
        public duration: {
            isInfinite: boolean
            isActive: boolean
            current: number | undefined
            max: number | undefined
        },
        public updateOnBeginning: boolean
    ) {
        super(id, name, type, origin, target, duration, updateOnBeginning)
        this.duration = duration
    }
    use() {
        const feedStore = useFeedStore()
        this.target.currentStats.hp -= 1
        feedStore.setBattleFeedItem(`${this.target.name} is bleeding for 1 hp`)
        console.log(`${this.target.name} is bleeding for 1 hp`)
    }
}

class StatusAttackBonusDamage extends StatusItem implements IStatusBonusDamage {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public origin: IPlayer | MonsterModel | AllItemTypes | undefined,
        public target: IPlayer | MonsterModel | undefined,
        public duration: {
            isInfinite: boolean
            isActive: boolean
            current: number | undefined
            max: number | undefined
        },
        public updateOnBeginning: boolean,
        public bonusDamage: number
    ) {
        super(id, name, type, origin, target, duration, updateOnBeginning)
        this.bonusDamage = bonusDamage
    }

    use() {
        return this.bonusDamage
    }
}

export { StatusItem, StatusDamageOverTime, StatusAttackBonusDamage, StatusBonusStat }
