import { reactive, toRefs } from 'vue'
import { IMonster } from '@/interfaces/IMonster'
import { useAttack } from './useAttack'
import { IPlayer } from '@/interfaces/IPlayer'

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

    const attackTarget = (attacker: IMonster, enemy: IPlayer | IMonster) => {
        console.log(this, attacker)
        attack(attacker, enemy)
    }
    return {
        ...toRefs(state),
        setEnemy,
        getEnemy,
        takeDamage,
        attackTarget,
    }
}
