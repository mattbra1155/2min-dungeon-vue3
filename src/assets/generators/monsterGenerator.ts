import { bestiary } from '@/assets/generators/bestiary'
import { MonsterModel } from '@/assets/models/monsterModel'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'

class MonsterGenerator {
    id: number
    constructor() {
        this.id = 1
    }
    create() {
        const generateId = () => {
            return this.id++
        }
        const bestiaryCopy = structuredClone(bestiary)
        const monsterRandom = bestiaryCopy[Math.floor(Math.random() * bestiaryCopy.length)]
        const generatedWeapon = new ItemGenerator().createItem(EItemCategory.Weapon)
        const monsterClass = new MonsterModel()
        console.log(monsterRandom)

        const monster: MonsterModel = Object.assign(monsterClass, monsterRandom, {
            id: generateId(),
            weapon: generatedWeapon,
        })
        return monster
    }
}

const monsterGenerator = new MonsterGenerator()

export { monsterGenerator }
