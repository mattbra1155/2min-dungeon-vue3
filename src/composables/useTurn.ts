import { reactive, toRefs } from 'vue'

import { TurnModel } from '@/assets/models/turnModel'

interface iTurn {
    turnModel: TurnModel
}

const state: iTurn = reactive({
    turnModel: new TurnModel(),
})

export const useTurn = () => {
    return {
        ...toRefs(state),
    }
}
