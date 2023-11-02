import { reactive, toRefs } from 'vue'
import { MonsterModel } from '@/assets/models/monsterModel'
import { PlayerModel } from '@/assets/models/playerModel'

interface IAttackState {
    targetToAttack: MonsterModel | PlayerModel | null
}

const state: IAttackState = reactive({
    targetToAttack: null,
})

export const useAttack = () => {
    const setTargetToAttack = (enemy: MonsterModel | PlayerModel | null) => {
        state.targetToAttack = enemy
    }
    return {
        ...toRefs(state),
        setTargetToAttack,
    }
}
