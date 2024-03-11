import { Room } from '@/assets/models/RoomModel'
import { RoomObject } from '@/assets/models/RoomObjectModel'
import { reactive, toRefs } from 'vue'

interface useFeedState {
    feedList: string[]
    activeRoomObject: RoomObject | null
}
const state: useFeedState = reactive({
    feedList: [],
    activeRoomObject: null,
})

export const useFeed = () => {
    const setActiveRoomObject = (roomObject: RoomObject | null) => (state.activeRoomObject = roomObject)
    const setNotification = (message: string) => {
        state.feedList.push(message)
    }
    const resetFeed = () => {
        state.feedList = []
    }
    return {
        ...toRefs(state),
        setActiveRoomObject,
        setNotification,
        resetFeed,
    }
}
