import { PersonModel } from './personModel'
import { iBodyPart } from '@/interfaces/BodyParts'
import { Inventory } from './inventoryModel'
import { bodyPartsModel } from './bodyPartsModel'
import { Modifiers } from './modifiersModel'
import { Weapon } from './itemsModel'
import { IStats } from '@/interfaces/IStats'
import { Profession } from './professionModel'
import { stats as statsModel } from '@/assets/models/statsModel'
import { IPlayer } from '@/interfaces/IPlayer'
import { Status } from './statusModel'
import { ISkill } from '@/interfaces/ISkill'

class PlayerModel implements IPlayer {
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
        public offHand: Weapon | null = null,
        public description: string = '',
        public inventory: Inventory = new Inventory(),
        public isAlive: boolean = true,
        public isPlayer: boolean = true,
        public modifiers: Modifiers = new Modifiers(),
        public status: Status = new Status(),
        public skills: ISkill[] = [],
        public image: string | null = null
    ) {}
}
export { PlayerModel }
