import { bestiary } from '@/assets/generators/bestiary'
import { MonsterModel } from '@/assets/models/monsterModel'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'
import { EStats } from '@/enums/EStats'
import { stats as statsModel } from '@/assets/models/statsModel'
import { diceRollK6 } from '../scripts/diceRoll'
import { IStats } from '@/interfaces/IStats'
import { Weapon } from '../models/itemsModel'

interface IMonsterData {
    id: string
    name: string
    stats: IStats
    level: number
    type: string
    weapon: Weapon | null
    description: string
}
class MonsterGenerator {
    create(monsterId?: string) {
        const generateId = () => {
            return self.crypto.randomUUID()
        }
        const bestiaryCopy = structuredClone(bestiary)
        let monsterData: IMonsterData | null = null
        if (!monsterId) {
            monsterData = bestiaryCopy[Math.floor(Math.random() * bestiaryCopy.length)]
        } else {
            monsterData = bestiary.find((monster) => monster.id === monsterId) as IMonsterData
        }

        console.log(monsterData, monsterId)

        const generatedWeapon = new ItemGenerator().createItem(EItemCategory.Weapon)
        const monsterClass = new MonsterModel()

        const monster: MonsterModel = Object.assign(monsterClass, monsterData, {
            id: generateId(),
            weapon: generatedWeapon,
            stats: structuredClone(statsModel),
            originId: monsterData.id,
        })

        Object.entries(monsterData.stats).forEach(([key, value]) => {
            const statName = Object.values(EStats).find((stat) => stat === key)
            if (!statName) {
                throw new Error('No statName')
            }

            monster.stats[statName] = value
            monster.currentStats[statName] = value
        })
        monster.inventory.gold = diceRollK6()
        return monster
    }
}

// const monsterGenerator = new MonsterGenerator()
export { MonsterGenerator }
