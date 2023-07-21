import { reactive, toRefs } from 'vue'
import { IMonster } from '@/interfaces/IMonster'
import { useAttack } from '@/composables/useAttack'
import { PlayerModel } from '@/assets/models/playerModel'

// const { activeCharacter } = useTurn()
const { attack } = useAttack()

const state = reactive({
    enemy: <IMonster>{},
})

export const useEnemy = () => {
    const setEnemy = (payload: IMonster) => {
        state.enemy = payload
    }

    const takeDamage = (damage: number) => {
        state.enemy.stats.hp -= damage
    }
    const getEnemy = () => state.enemy

    const enemyAttackTarget = (enemy: PlayerModel | IMonster) => {
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
