import { PersonModel } from '@/assets/models/personModel'
import { iBodyPart } from '@/interfaces/BodyParts'
import { IMonster } from '@/interfaces/IMonster'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { Inventory } from '@/assets/models/inventoryModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { Weapon } from '@/assets/models/itemsModel'
import { stats as statsModel } from '@/assets/models/statsModel'
import { IStats } from '@/interfaces/IStats'

class MonsterModel extends PersonModel implements IMonster {
    constructor(
        public id: string = self.crypto.randomUUID(),
        public name: string = '',
        public race: string = '',
        public stats: IStats = structuredClone(statsModel),
        public currentStats: IStats = structuredClone(statsModel),
        public weapon: null | Weapon = null,
        public bodyParts: iBodyPart = bodyPartsModel,
        public inventory: Inventory = new Inventory(),
        public description: string = '',
        public isAlive: boolean = true,
        public modifiers: Modifiers = new Modifiers(),
        public prefferedPosition: string = '',
        public level: number = 1
    ) {
        super(id, name, race, stats, currentStats, bodyParts, weapon, description, inventory, isAlive, modifiers)
    }
}

export { MonsterModel }
