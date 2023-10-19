import { EModifierTypes } from '@/enums/EModifierTypes'
import { IStatusBonusDamage, IStatusBonusStats, IStatusDamageOverTime, IStatusItem } from '@/interfaces/IStatus'
import { EStats } from '@/enums/EStats'
import { IStats } from '@/interfaces/IStats'
import { useSceneManager } from '@/composables/useSceneManager'

const { scene } = useSceneManager()
class StatusItem implements IStatusItem {
    constructor(
        public id: string = `status-${self.crypto.randomUUID()}`,
        public name: string,
        public type: EModifierTypes,
        public originId: string | undefined,
        public targetId: string | undefined,
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
        public originId: string | undefined,
        public targetId: string,
        public duration: {
            isInfinite: boolean
            isActive: boolean
            current: number | undefined
            max: number | undefined
        },
        public updateOnBeginning: boolean,
        public bonusStatList: Partial<IStats>
    ) {
        super(id, name, type, origin, targetId, duration, updateOnBeginning)
    }
    use(targetId: string) {
        const target = scene.value?.entityList.find((entity) => entity.id === targetId)
        if (!target) {
            console.error('No target found')
            return
        }
        Object.entries(this.bonusStatList).forEach((bonusStat) => {
            const statName = Object.values(EStats).find((stat) => stat === bonusStat[0])
            console.log('PASSIVE', statName, bonusStat)

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
        public originId: string | undefined,
        public targetId: string,
        public duration: {
            isInfinite: boolean
            isActive: boolean
            current: number | undefined
            max: number | undefined
        },
        public updateOnBeginning: boolean
    ) {
        super(id, name, type, originId, targetId, duration, updateOnBeginning)
        this.duration = duration
    }
    use() {
        const target = scene.value?.entityList.find((entity) => entity.id === this.targetId)
        if (!target) {
            console.error('No target found')
            return
        }
        target.currentStats.hp -= 1
        console.log(`${target.name} is bleeding for 1 hp`)
    }
}

class StatusAttackBonusDamage extends StatusItem implements IStatusBonusDamage {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public originId: string | undefined,
        public targetId: string | undefined,
        public duration: {
            isInfinite: boolean
            isActive: boolean
            current: number | undefined
            max: number | undefined
        },
        public updateOnBeginning: boolean,
        public bonusDamage: number
    ) {
        super(id, name, type, origin, targetId, duration, updateOnBeginning)
        this.bonusDamage = bonusDamage
    }

    use() {
        return this.bonusDamage
    }
}

export { StatusItem, StatusDamageOverTime, StatusAttackBonusDamage, StatusBonusStat }
