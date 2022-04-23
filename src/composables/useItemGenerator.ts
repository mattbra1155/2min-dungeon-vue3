import { EItemCategory } from '@/enums/ItemCategory'
import { reactive, toRefs } from 'vue'
import localforage from 'localforage'

interface iStateUseItemGenerator {
    ids: {
        weapon: number
        armor: number
        potion: number
    }
}
const state: iStateUseItemGenerator = reactive({
    ids: {
        weapon: 0,
        armor: 0,
        potion: 0,
    },
})

export const useItemGenerator = () => {
    const incrementItemId = (category: EItemCategory) => {
        setItemIdState()
        switch (category) {
            case EItemCategory.Weapon:
                state.ids.weapon++
                break
            case EItemCategory.Armor:
                state.ids.armor++
                break
            case EItemCategory.Potion:
                state.ids.potion++
                break
        }
        saveItemIdState()
        return state.ids[category]
    }
    const saveItemIdState = () => {
        localforage.setItem('itemIdState', JSON.stringify(state.ids))
    }
    const getItemIdState = async () => {
        const response: string | null = await localforage.getItem('itemIdState')
        if (response) {
            const result = JSON.parse(response)
            return result
        }
    }
    const setItemIdState = async () => {
        state.ids = await getItemIdState()
    }
    return {
        ...toRefs(state),
        saveItemIdState,
        getItemIdState,
        incrementItemId,
    }
}
