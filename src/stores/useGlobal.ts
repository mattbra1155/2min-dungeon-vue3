import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
    const isAttacking = ref<boolean>(false)
    const isLoading = ref<boolean>(false)
    const isMoving = ref<boolean>(false)

    const toggleIsAttacking = () => (isAttacking.value ? false : true)
    const toggleIsLoading = () => (isLoading.value ? false : true)
    const toggleIsMoving = () => (isMoving.value ? false : true)
    return {
        isLoading,
        isAttacking,
        isMoving,
        toggleIsAttacking,
        toggleIsLoading,
        toggleIsMoving,
    }
})
