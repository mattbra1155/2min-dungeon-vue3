import { reactive, toRefs } from 'vue'
import { MonsterModel } from '@/assets/models/monsterModel'
import { IPlayer } from '@/interfaces/IPlayer'

interface IAttackState {
    targetToAttack: MonsterModel | IPlayer | null
}

const state: IAttackState = reactive({
    targetToAttack: null,
})

export const useAttack = () => {
    const setTargetToAttack = (enemy: MonsterModel | IPlayer | null) => {
        state.targetToAttack = enemy
    }
    return {
        ...toRefs(state),
        setTargetToAttack,
    }
}
