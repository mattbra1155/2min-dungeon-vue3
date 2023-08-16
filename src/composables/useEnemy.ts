import { reactive, toRefs } from 'vue'
import { MonsterModel } from '@/assets/models/monsterModel'
import { useAttack } from '@/composables/useAttack'
import { PlayerModel } from '@/assets/models/playerModel'

// const { activeCharacter } = useTurn()
const { attack } = useAttack()

const state = reactive({
    enemy: <MonsterModel>{},
})

export const useEnemy = () => {
    const setEnemy = (payload: MonsterModel) => {
        state.enemy = payload
    }

    const takeDamage = (damage: number) => {
        state.enemy.stats.hp.value -= damage
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
