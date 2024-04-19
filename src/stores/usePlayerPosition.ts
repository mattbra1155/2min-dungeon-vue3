import { defineStore } from 'pinia'
import { ref } from 'vue'
interface coords {
    x: number
    y: number
}
export const usePlayerPositionStore= defineStore('playerPosition', () => {
    const coords = ref<coords>({
        x: 22,
        y: 19
    })

    const updateCoords =(x: number, y: number) => {
        coords.value.x = x
        coords.value.y = y
    }
    return {
        coords,
        updateCoords
    }
})
