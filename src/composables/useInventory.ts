import { IInventoryState } from '@/interfaces/IInventory'
import { reactive, toRefs } from 'vue'

const state: IInventoryState = reactive({
    activeItemId: null,
    isOpen: false,
    notifications: [],
})

export const useInventory = () => {
    const setactiveItemId = (itemId: string) => {
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
        console.log(state.isOpen)

        if (state.isOpen) {
            state.isOpen = false
            state.activeItemId = null
        } else {
            state.isOpen = true
        }
    }
    const setNotification = (text: string) => {
        state.notifications.unshift(text)
        setTimeout(() => {
            state.notifications.shift()
        }, 3000)
    }
    return {
        ...toRefs(state),
        toggleInventory,
        setactiveItemId,
        setNotification,
    }
}
