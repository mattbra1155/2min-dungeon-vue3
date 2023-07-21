import { reactive, toRefs } from 'vue'

interface characterScreenState {
    isOpen: boolean
}
const state: characterScreenState = reactive({
    isOpen: false,
})

export const useCharacterScreen = () => {
    const toggleCharacterScreen = () => {
        return state.isOpen ? (state.isOpen = false) : (state.isOpen = true)
    }
    return {
        ...toRefs(state),
        toggleCharacterScreen,
    }
}
