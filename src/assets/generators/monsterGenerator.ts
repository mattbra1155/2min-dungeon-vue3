import { bestiary } from '@/assets/generators/bestiary'
import { MonsterModel } from '@/assets/models/monsterModel'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'
import { iMonster } from '@/interfaces/Monster'

class MonsterGenerator {
    id: number
    constructor() {
        this.id = 0
    }
    create() {
        const generateId = () => {
            return this.id++
        }
        const bestiaryCopy = [...bestiary]
        const monsterRandom = bestiaryCopy[Math.floor(Math.random() * bestiaryCopy.length)]
        const generatedWeapon = new ItemGenerator().createItem(EItemCategory.Weapon)
        const monsterClass = new MonsterModel()
        const monster: iMonster = Object.assign(monsterClass, monsterRandom, {
            id: generateId(),
            weapon: generatedWeapon,
        })
        return monster
    }
}

const monsterGenerator = new MonsterGenerator()

export { monsterGenerator }
