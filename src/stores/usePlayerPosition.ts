import { defineStore } from 'pinia'
import { ref } from 'vue'
interface coords {
    x: number | undefined
    y: number | undefined
}

export const usePlayerPositionStore = defineStore('playerPosition', () => {
    const coords = ref<coords>({
        x: undefined,
        y: undefined,
    })

    const updateCoords = (x: number, y: number) => {
        coords.value.x = x
        coords.value.y = y
    }
    return {
        coords,
        updateCoords,
    }
})
