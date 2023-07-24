import { EModifierTypes } from '@/enums/EModifierTypes'
import { IModifier } from '@/interfaces/IModifier'
import { IStats } from '@/interfaces/IStats'

class Modifier implements IModifier {
    constructor(public id: number, public name: string, public type: EModifierTypes, public modifiers: IStats) {
        this.id = id
        this.name = name
        this.type = type
        this.modifiers = modifiers
    }
}

export { Modifier }
