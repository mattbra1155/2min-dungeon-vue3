import { PersonModel } from '@/assets/models/personModel'
import { iBodyPart } from '@/interfaces/BodyParts'
import { IMonster } from '@/interfaces/IMonster'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { Inventory } from '@/assets/models/inventoryModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { Weapon } from '@/assets/models/itemsModel'
import { IStats } from '@/interfaces/IStats'

class MonsterModel extends PersonModel implements IMonster {
    constructor(
        public id: string = self.crypto.randomUUID(),
        public name: string = '',
        public race: string = '',
        public stats: IStats = {
            hp: 0,
            melee: 0,
            ranged: 0,
            dexterity: 0,
            strength: 0,
            thoughtness: 0,
            speed: 0,
            initiative: 0,
            attacks: 0,
            inteligence: 0,
            charisma: 0,
            willPower: 0,
        },
        public currentStats: IStats = stats,
        public weapon: null | Weapon = null,
        public bodyParts: iBodyPart = bodyPartsModel,
        public inventory: Inventory = new Inventory(),
        public description: string = '',
        public isAlive: boolean = true,
        public modifiers: Modifiers = new Modifiers(),
        public prefferedPosition: string = ''
    ) {
        super(id, name, race, stats, currentStats, bodyParts, weapon, description, inventory, isAlive, modifiers)
    }
}

export { MonsterModel }
