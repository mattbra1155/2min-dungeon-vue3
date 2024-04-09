import { RoomObject } from '@/assets/models/RoomObjectModel'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFeedStore = defineStore('feed', () => {
    const feedTravelList = ref<any[]>([])
    const feedBattleList = ref<any[]>([])
    const activeRoomObject = ref<RoomObject>()

    const setActiveRoomObject = (roomObject: RoomObject) => (activeRoomObject.value = roomObject)
    const setTravelFeedItem = (message: string) => feedTravelList.value.push(message)
    const setBattleFeedItem = (message: string) => feedBattleList.value.push(message)
    const resetTravelFeed = () => (feedTravelList.value = [])
    const resetBattleFeed = () => (feedBattleList.value = [])

    return {
        feedTravelList,
        feedBattleList,
        activeRoomObject,
        setActiveRoomObject,
        setTravelFeedItem,
        setBattleFeedItem,
        resetTravelFeed,
        resetBattleFeed,
    }
})
