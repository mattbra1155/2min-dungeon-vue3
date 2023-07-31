import { EModifierTypes } from '@/enums/EModifierTypes'
import { IModifierItem } from '@/interfaces/IModifiers'
import { IMonster } from '@/interfaces/IMonster'
import { IStats } from '@/interfaces/IStats'
import { PlayerModel } from './playerModel'

class ModifierItem implements IModifierItem {
    constructor(
        public id: string,
        public name: string,
        public type: EModifierTypes,
        public modifiers: Partial<IStats> | number,
        public owner: PlayerModel | IMonster | undefined,
        public target: PlayerModel | IMonster | undefined,
        public updateOnBeginning: boolean = true,
        public duration: {
            isActive: boolean
            current: number
            max: number
        }
    ) {
        this.id = id
        this.name = name
        this.type = type
        this.modifiers = modifiers
        this.owner = owner
        this.target = target
        this.duration = duration
    }
}

export { ModifierItem }
