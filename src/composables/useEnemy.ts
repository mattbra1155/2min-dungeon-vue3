import { reactive, readonly } from 'vue'
import { Monster } from '@/interfaces/Monster'
const state = reactive({
    enemy: <Monster>{},
})

export default function useEnemy() {
    const setEnemy = (payload: Monster) => {
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
