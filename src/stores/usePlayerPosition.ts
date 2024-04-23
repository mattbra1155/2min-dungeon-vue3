import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSceneManagerStore } from './useSceneManager'
interface coords {
    x: number
    y: number
}

export const usePlayerPositionStore = defineStore('playerPosition', () => {
    const sceneManager = useSceneManagerStore()
    const coords = ref<coords>({
        x: sceneManager.activeRoom?.x || 19,
        y: sceneManager.activeRoom?.y || 21,
    })

    const updateCoords = (x: number, y: number) => {
        coords.value.x = x
        coords.value.y = y
    }
    return {
        coords,
        updateCoords
    }
})
