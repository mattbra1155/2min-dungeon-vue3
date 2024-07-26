import { PersonModel } from '@/assets/models/personModel'
import { iBodyPart } from '@/interfaces/BodyParts'
import { IMonster } from '@/interfaces/IMonster'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { Inventory } from '@/assets/models/inventoryModel'
import { Modifiers } from '@/assets/models/modifiersModel'
import { Weapon } from '@/assets/models/itemsModel'
import { stats as statsModel } from '@/assets/models/statsModel'
import { IStats } from '@/interfaces/IStats'
import { lootLists } from '../data/lootList'

class MonsterModel extends PersonModel implements IMonster {
    constructor(
        public id: string = self.crypto.randomUUID(),
        public originId: string = '',
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
        public offHand: Weapon | null = null,
        public level: number = 1,
        public isHostile: boolean = true,
        public loot: any[] = lootLists.goblin
    ) {
        super(
            id,
            name,
            race,
            stats,
            currentStats,
            bodyParts,
            weapon,
            offHand,
            description,
            inventory,
            isAlive,
            modifiers
        )
        this.prefferedPosition = prefferedPosition
        this.level = level
        this.isHostile = isHostile
    }
}

export { MonsterModel }
