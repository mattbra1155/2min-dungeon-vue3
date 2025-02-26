import { reactive, readonly } from 'vue'

const state = reactive({
    activeState: '',
    states: ['init', 'menu', 'paused', 'player turn', 'enemy turn'],
})

export default function useGameEngine() {
    const getActiveState = () => state.activeState

    return {
        state: readonly(state),
        getActiveState,
    }
}
