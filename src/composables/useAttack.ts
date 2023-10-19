import { reactive, toRefs } from 'vue'

interface IAttackState {
    targetToAttack: string | null
}

const state: IAttackState = reactive({
    targetToAttack: null,
})

export const useAttack = () => {
    const setTargetToAttack = (enemyId: string | null) => {
        state.targetToAttack = enemyId
    }
    return {
        ...toRefs(state),
        setTargetToAttack,
    }
}
