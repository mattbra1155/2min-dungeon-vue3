// import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { iBodyPart } from '@/interfaces/BodyParts'
import { Inventory } from './inventoryModel'
import { bodyPartsModel } from './bodyPartsModel'
import { IPlayer } from '@/interfaces/IPlayer'
import { PersonModel } from './personModel'
import { Modifiers } from './modifiersModel'
import { Weapon } from './itemsModel'
import { IStats } from '@/interfaces/IStats'
import { Profession } from './professionModel'
import { stats as statsModel } from '@/assets/models/statsModel'
import { sceneManager } from './sceneManager'

class PlayerModel extends PersonModel implements IPlayer {
    constructor(
        public id: string = self.crypto.randomUUID(),
        public name: string = 'Charname',
        public race: string = 'dwarf',
        public profession: Profession | undefined = new Profession(),
        public stats: IStats = structuredClone(statsModel),
        public currentStats: IStats = structuredClone(statsModel),
        public advancedStats: Partial<IStats> = {},
        public bodyParts: iBodyPart = bodyPartsModel,
        public weapon: Weapon | null = null,
        public description: string = '',
        public inventory: Inventory = new Inventory(),
        public isAlive: boolean = true,
        public player: boolean = true,
        public modifiers: Modifiers = new Modifiers()
    ) {
        super(id, name, race, stats, currentStats, bodyParts, weapon, description, inventory, isAlive, modifiers)
    }
}
export { PlayerModel }
