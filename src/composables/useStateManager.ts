import { reactive, toRefs } from 'vue'

const state = reactive({})

const useStateManager = () => {
    return {
        ...toRefs(state),
    }
}
