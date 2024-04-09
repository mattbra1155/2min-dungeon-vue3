import { RoomObject } from '@/assets/models/RoomObjectModel'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
    const isAttacking = ref<boolean>(false)

    const toggleIsAttacking = () => (isAttacking.value ? false : true)
    return {
        isAttacking,
        toggleIsAttacking,
    }
})
