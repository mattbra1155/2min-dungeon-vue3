import { reactive, toRefs } from 'vue'
import { iMonster } from '@/interfaces/Monster'
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
        ...toRefs(state),
        setEnemy,
        getEnemy,
        takeDamage,
    }
}
