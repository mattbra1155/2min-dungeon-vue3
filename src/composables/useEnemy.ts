import { reactive, toRefs } from 'vue'
import { MonsterModel } from '@/assets/models/monsterModel'
import { IPlayer } from '@/interfaces/IPlayer'

const state = reactive({
    enemy: <MonsterModel>{},
})

export const useEnemy = () => {
    const setEnemy = (payload: MonsterModel) => {
        state.enemy = payload
    }

    const takeDamage = (damage: number) => {
        state.enemy.stats.hp -= damage
    }
    const getEnemy = () => state.enemy

    return {
        ...toRefs(state),
        setEnemy,
        getEnemy,
        takeDamage,
    }
}
