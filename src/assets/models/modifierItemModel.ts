import { EModifierTypes } from '@/enums/EModifierTypes'
import { IModifierDamageOverTime, IModifierItem, IModifierStatus } from '@/interfaces/IModifiers'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from './playerModel'
import { diceRollK100 } from '@/assets/scripts/diceRoll'
import modifiers from '@/assets/json/modifiers.json'

class ModifierItem implements IModifierItem {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public owner: PlayerModel | MonsterModel | undefined,
        public target: PlayerModel | MonsterModel | undefined
    ) {
        this.id = id
        this.name = name
        this.type = type
        this.owner = owner
        this.target = target
    }
}

class ModifierStatus extends ModifierItem implements IModifierStatus {
    constructor(
        public id: string = `status-${self.crypto.randomUUID()}`,
        public name: string,
        public type: EModifierTypes,
        public origin: PlayerModel | MonsterModel | undefined,
        public target: PlayerModel | MonsterModel | undefined,
        public duration: {
            isActive: boolean
            current: number | undefined
            max: number | undefined
        },
        public updateOnBeginning: boolean
    ) {
        super(id, name, type, origin, target)
        this.id = id
        this.duration = duration
        this.updateOnBeginning = updateOnBeginning
    }
}

class ModifierDamageOverTime extends ModifierItem implements IModifierDamageOverTime {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public owner: PlayerModel | MonsterModel | undefined,
        public target: PlayerModel | MonsterModel | undefined,
        public chanceToApply: number | null = null,
        public effectId: string
    ) {
        super(id, name, type, owner, target)
        this.chanceToApply = chanceToApply
    }

    private applyEffect(target: PlayerModel | MonsterModel, modifierId: string) {
        const modifierData = modifiers.find((mod) => mod.id === modifierId)
        if (!modifierData) {
            console.error('No modifier found')
            return
        }

        const status = new ModifierStatus(
            `status-${self.crypto.randomUUID()}`,
            this.name,
            EModifierTypes.Status,
            undefined,
            undefined,
            {
                isActive: modifierData.duration.isActive,
                current: undefined,
                max: modifierData.duration.max,
            },
            modifierData.updateOnBeginning
        )

        target.modifiers.addItem(status)
    }

    use() {
        const roll = diceRollK100()
        if (!this.target) {
            return
        }
        if (this.chanceToApply && roll <= this.chanceToApply) {
            this.applyEffect(this.target, this.effectId)
        }
    }
}

export { ModifierItem, ModifierDamageOverTime, ModifierStatus }
