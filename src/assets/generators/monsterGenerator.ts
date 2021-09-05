import { bestiary } from '@/assets/generators/bestiary'
import { MonsterModel } from '@/assets/models/monsterModel'

class MonsterGenerator {
    create() {
        const bestiaryCopy = [...bestiary]
        const monsterRandom =
            bestiaryCopy[Math.floor(Math.random() * bestiaryCopy.length)]
        // monster.weapon = new ItemGenerator().createItem('weapon')
        const monsterClass = new MonsterModel()
        const monster = Object.assign(monsterClass, monsterRandom)
        console.log(monster)
        return monster
    }
}

export { MonsterGenerator }
