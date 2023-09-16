import { EModifierTypes } from '@/enums/EModifierTypes'
import { IModifierDamageOverTime, IModifierItem, IModifiersList } from '@/interfaces/IModifiers'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from './playerModel'
import { diceRollK100 } from '@/assets/scripts/diceRoll'

class ModifierItem implements IModifierItem {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public owner: PlayerModel | MonsterModel | undefined,
        public target: PlayerModel | MonsterModel | undefined,
        public updateOnBeginning: boolean = true
    ) {
        this.id = id
        this.name = name
        this.type = type
        this.owner = owner
        this.target = target
    }
}

class ModifierStatus extends ModifierItem {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public owner: PlayerModel | MonsterModel | undefined,
        public target: PlayerModel | MonsterModel | undefined
    ) {
        super(id, name, type, owner, target)
    }
}

class ModifierDamageOverTime extends ModifierItem implements IModifierDamageOverTime {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public chanceToApply: number | null = null,
        public owner: PlayerModel | MonsterModel | undefined,
        public target: PlayerModel | MonsterModel | undefined,
        public effectId: string,
        public duration: {
            isActive: boolean
            current: number
            max: number
        }
    ) {
        super(id, name, type, owner, target)
        this.chanceToApply = chanceToApply
        this.duration = duration
    }

    private applyEffect(target: PlayerModel | MonsterModel, modifierId: string) {
        target.modifiers.addItem()
    }

    use() {
        const roll = diceRollK100()
        if (this.chanceToApply && roll <= this.chanceToApply) {
            this.applyEffect(this.target)
        }
    }
}

export { ModifierItem, ModifierDamageOverTime }
