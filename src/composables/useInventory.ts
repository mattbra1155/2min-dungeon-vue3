import { IInventoryState } from '@/interfaces/IInventory'
import { reactive, toRefs } from 'vue'

const state: IInventoryState = reactive({
    isOpen: false,
})

export const useInventory = () => {
    const toggleInventory = () => {
        if (state.isOpen) {
            state.isOpen = false
        } else {
            state.isOpen = true
        }
    }
    return {
        ...toRefs(state),
        toggleInventory,
    }
}
