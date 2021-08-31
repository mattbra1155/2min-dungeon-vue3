import { reactive, readonly } from 'vue'
import { iMonster } from '@/interfaces/iMonster'
const state = reactive({
    enemy: <iMonster>{},
})

export default function useEnemy() {
    const setEnemy = (payload: iMonster) => {
        state.enemy = payload
    }

    const takeDamage = (damage: number) => {
        state.enemy.stats.hp -= damage
    }
    const getEnemy = () => state.enemy
    return {
        state: readonly(state),
        setEnemy,
        getEnemy,
        takeDamage,
    }
}
