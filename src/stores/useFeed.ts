import { RoomObject } from '@/assets/models/RoomObjectModel'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFeedStore = defineStore('feed', () => {
    const feedList = ref<any[]>([])
    const activeRoomObject = ref<RoomObject | null>(null)

    const setActiveRoomObject = (roomObject: RoomObject | null) => (activeRoomObject.value = roomObject)
    const setNotification = (message: string) => {
        feedList.value.push(message)
    }
    const resetFeed = () => {
        feedList.value = []
    }
    return {
        feedList,
        activeRoomObject,
        setActiveRoomObject,
        setNotification,
        resetFeed,
    }
})
