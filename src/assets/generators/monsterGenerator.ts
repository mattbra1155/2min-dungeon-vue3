import { bestiary } from '@/assets/generators/bestiary'
import { MonsterModel } from '@/assets/models/monsterModel'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'

class MonsterGenerator {
    create() {
        const bestiaryCopy = [...bestiary]
        const monsterRandom = bestiaryCopy[Math.floor(Math.random() * bestiaryCopy.length)]
        const generatedWeapon = new ItemGenerator().createItem(EItemCategory.Weapon)
        const monsterClass = new MonsterModel()
        const monster = Object.assign(monsterClass, monsterRandom)
        // monster.weapon = generatedWeapon
        return monster
    }
}

export { MonsterGenerator }
