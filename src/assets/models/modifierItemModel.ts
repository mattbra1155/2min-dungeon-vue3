import { EModifierTypes } from '@/enums/EModifierTypes'
import { IModifierBase, IModifierStatus, IModiferItem } from '@/interfaces/IModifiers'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from './playerModel'
import { diceRollK100 } from '@/assets/scripts/diceRoll'
import { statusList } from '@/assets/json/modifiers.json'

class ModifierBase implements IModifierBase {
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

class ModifierStatus extends ModifierBase implements IModifierStatus {
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

class ModifierItem extends ModifierBase implements IModiferItem {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public owner: PlayerModel | MonsterModel | undefined,
        public target: PlayerModel | MonsterModel | undefined,
        public chanceToApply: number | null = null,
        public statusId: string
    ) {
        super(id, name, type, owner, target)
        this.chanceToApply = chanceToApply
    }

    applyEffect(target: PlayerModel | MonsterModel, modifierId: string) {
        const modifierData = statusList.find((mod) => mod.id === modifierId)
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
        console.log(`Applied status: ${status.name}`)
    }

    use() {
        const roll = diceRollK100()
        if (!this.target) {
            return
        }
        if (this.chanceToApply && roll <= this.chanceToApply) {
            this.applyEffect(this.target, this.statusId)
        }
    }
}

export { ModifierItem, ModifierBase, ModifierStatus }
