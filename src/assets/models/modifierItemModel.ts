import { IModifierItem } from '@/interfaces/IModifiers'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from './playerModel'
import { diceRollK100 } from '@/assets/scripts/diceRoll'

class ModifierItem implements IModifierItem {
    constructor(config: IModifierItem) {
        this.config = config
    }

    // applyEffect(target: PlayerModel | MonsterModel, modifierId: string) {
    //     const modifierData = statusList.find((mod) => mod.id === modifierId)
    //     if (!modifierData) {
    //         console.error('No modifier found')
    //         return
    //     }

    //     const status = new ModifierStatus(
    //         `status-${self.crypto.randomUUID()}`,
    //         this.name,
    //         EModifierTypes.Status,
    //         undefined,
    //         undefined,
    //         {
    //             isActive: modifierData.duration.isActive,
    //             current: undefined,
    //             max: modifierData.duration.max,
    //         },
    //         modifierData.updateOnBeginning
    //     )

    //     target.modifiers.addItem(status)
    //     console.log(`Applied status: ${status.name}`)
    // }

    use(target: PlayerModel | MonsterModel) {
        const roll = diceRollK100()
        if (!target) {
            return
        }
        // if (this.config.chanceToApply && roll <= this.config.chanceToApply) {
        //     this.applyEffect(target, statusId)
        // }
    }
}

export { ModifierItem }
