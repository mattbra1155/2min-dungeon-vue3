import { bestiary } from '@/assets/generators/bestiary'
import { MonsterModel } from '@/assets/models/monsterModel'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'
import { EStats } from '@/enums/EStats'
import { stats as statsModel } from '@/assets/models/statsModel'
import { diceRollK6 } from '../scripts/diceRoll'

class MonsterGenerator {
    create() {
        const generateId = () => {
            return self.crypto.randomUUID()
        }
        const bestiaryCopy = structuredClone(bestiary)
        const monsterRandom = bestiaryCopy[Math.floor(Math.random() * bestiaryCopy.length)]
        const generatedWeapon = new ItemGenerator().createItem(EItemCategory.Weapon)
        const monsterClass = new MonsterModel()
        console.log(monsterRandom)

        const monster: MonsterModel = Object.assign(monsterClass, monsterRandom, {
            id: generateId(),
            weapon: generatedWeapon,
            stats: structuredClone(statsModel),
        })

        Object.entries(monsterRandom.stats).forEach(([key, value]) => {
            const statName = Object.values(EStats).find((stat) => stat === key)
            if (!statName) {
                throw new Error('No statName')
            }

            monster.stats[statName].value = value
        })
        monster.inventory.gold = diceRollK6()
        return monster
    }
}

const monsterGenerator = new MonsterGenerator()

export { monsterGenerator }
