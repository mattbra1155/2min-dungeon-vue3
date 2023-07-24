import { EModifierTypes } from '@/enums/EModifierTypes'
import { IModifierItem } from '@/interfaces/IModifiers'
import { IMonster } from '@/interfaces/IMonster'
import { IStats } from '@/interfaces/IStats'
import { PlayerModel } from './playerModel'

class ModifierItem implements IModifierItem {
    constructor(
        public id: number,
        public name: string,
        public type: EModifierTypes,
        public modifiers: Partial<IStats>,
        public owner: PlayerModel | IMonster,
        public target: PlayerModel | IMonster,
        public updateOnBeginning: boolean = true
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
