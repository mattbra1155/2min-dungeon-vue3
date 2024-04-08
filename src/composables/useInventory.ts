import { IInventoryState } from '@/interfaces/IInventory'
import { reactive, toRefs } from 'vue'

const state: IInventoryState = reactive({
    activeItemId: null,
    isOpen: false,
    notifications: [],
})

export const useInventory = () => {
    const setactiveItemId = (itemId: string) => {
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
    const setTravelFeedItem = (text: string) => {
        state.notifications.unshift(text)
        setTimeout(() => {
            state.notifications.shift()
        }, 3000)
    }
    return {
        ...toRefs(state),
        toggleInventory,
        setactiveItemId,
        setTravelFeedItem,
    }
}
