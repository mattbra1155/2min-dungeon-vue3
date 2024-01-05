import { Room } from '@/assets/models/RoomModel'
import { RoomObject } from '@/assets/models/RoomObjectModel'
import { reactive, toRefs } from 'vue'

interface useFeedState {
    activeRoomObject: RoomObject | null
}
const state: useFeedState = reactive({
    activeRoomObject: null,
})

export const useFeed = () => {
    const setActiveRoomObject = (roomObject: RoomObject | null) => (state.activeRoomObject = roomObject)

    return {
        ...toRefs(state),
        setActiveRoomObject,
    }
}
