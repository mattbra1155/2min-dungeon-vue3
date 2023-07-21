import { EModifierTypes } from '@/enums/EModifierTypes'
import { IModifier } from '@/interfaces/IModifier'

class Modifier implements IModifier {
    constructor(public id: number, public name: string, public type: EModifierTypes) {
        this.id = id
        this.name = name
        this.type = type
    }
}

export { Modifier }
