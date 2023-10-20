import { reactive, toRefs } from 'vue'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'

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

    const enemyAttackTarget = (enemy: PlayerModel | MonsterModel) => {
        // attack(enemy)
    }
    return {
        ...toRefs(state),
        setEnemy,
        getEnemy,
        takeDamage,
        enemyAttackTarget,
    }
}
