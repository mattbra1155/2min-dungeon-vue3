import { reactive, toRefs } from 'vue'

const state = reactive({
    weaponId: 0,
    armorId: 0,
    potionId: 0,
})

export default function useItemGenerator() {
    const incrementItemId = (category: string) => {
        switch (category) {
            case 'weapon':
                state.weaponId++
                return state.weaponId
                break
            case 'armor':
                state.armorId++
                return state.armorId
                break
            case 'potion':
                state.potionId++
                return state.potionId
                break
        }
    }
    return {
        ...toRefs(state),
        incrementItemId,
    }
}
