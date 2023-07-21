import { IInventoryState } from '@/interfaces/IInventory'
import { reactive, toRefs } from 'vue'

const state: IInventoryState = reactive({
    activeItemId: null,
    isOpen: false,
})

export const useInventory = () => {
    const setactiveItemId = (itemId: number) => {
        console.log(itemId)
        if (!itemId) {
            return
        }
        if (itemId === state.activeItemId) {
            state.activeItemId = null
        } else {
            state.activeItemId = itemId
        }
    }
    const toggleInventory = () => {
        if (state.isOpen) {
            state.isOpen = false
            state.activeItemId = null
        } else {
            state.isOpen = true
        }
    }
    return {
        ...toRefs(state),
        toggleInventory,
        setactiveItemId,
    }
}
