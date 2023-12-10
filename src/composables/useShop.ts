import { reactive, toRefs } from 'vue'

interface IShopState {
    activeShopId: string | undefined
}
const state: IShopState = reactive({
    activeShopId: undefined,
})

export const useShop = () => {
    const setActiveShop = (shopId: string | undefined) => {
        state.activeShopId = shopId
    }
    return {
        ...toRefs(state),
        setActiveShop,
    }
}
