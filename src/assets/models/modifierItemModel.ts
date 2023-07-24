import { EModifierTypes } from '@/enums/EModifierTypes'
import { IModifier } from '@/interfaces/IModifier'
import { IMonster } from '@/interfaces/IMonster'
import { IStats } from '@/interfaces/IStats'
import { PlayerModel } from './playerModel'

class ModifierItem implements IModifier {
    constructor(
        public id: number,
        public name: string,
        public type: EModifierTypes,
        public modifiers: Partial<IStats>,
        public owner: PlayerModel | IMonster,
        public target: PlayerModel | IMonster
    ) {
        this.id = id
        this.name = name
        this.type = type
        this.modifiers = modifiers
        this.owner = owner
        this.target = target
    }
}

export { ModifierItem }
