<script setup lang="ts">
import { RoomObject } from '@/assets/models/RoomObjectModel'
import { useFeed } from '@/composables/useFeed'
import { usePlayer } from '@/composables/usePlayer'
import { useSceneManager } from '@/composables/useSceneManager'
import { AllItemTypes } from '@/interfaces/IItem'
import { computed, onMounted, watch } from 'vue'
const { activeScene } = useSceneManager()
const { activeRoomObject, feedList, newMessage } = useFeed()
const { player } = usePlayer()
const currentRoom = computed(() => activeScene.value?.currentRoom)
const isSearched = computed(() => currentRoom.value?.isSearched)
const openContainer = (item: RoomObject) => {
    if (item.isLocked) {
        const result = item.unlock(player.value)
        if (result) {
            item.setIsSearch(true)
        } else {
            newMessage('You were unable to open the chest')
        }
    }
}
const getItem = (container: RoomObject, item: AllItemTypes) => {
    const itemToRemoveIndex = container.items.findIndex((findItem) => findItem.id === item.id)
    container.items.splice(itemToRemoveIndex, 1)
    player.value.inventory.addItem(item, player.value.id)
    if (!container.items.length) {
        newMessage(`You took everything from ${container.name}`)
    }
}

const containers = computed(() => {
    if (!currentRoom.value?.roomObjects.length) {
        return 'You see nothing worth taking.'
    }
    const items = currentRoom.value?.roomObjects.map((roomObject) => {
        const isEmpty = roomObject.isSearched && roomObject.items.length === 0 ? 'empty ' : ''
        const name = roomObject.name
        return `${isEmpty}${name}`
    })

    return `There is a ${items} in the room.`
})

watch(
    () => isSearched.value,
    (isSearched) => {
        if (isSearched) {
            newMessage(`You searched this room already.`)
        }
    }
)

watch(
    () => containers.value,
    () => {
        newMessage(containers.value)
    }
)
console.log(containers.value)

onMounted(() => {
    newMessage('There is a chest in the room.')
})
</script>

<template>
    <div v-if="currentRoom" id="feed" class="o-feed">
        <ul id="feedContainer" class="o-feed__container">
            <template v-if="activeRoomObject">
                <div class="o-feed__item">
                    <img
                        class="a-image --contain o-feed__image"
                        v-if="activeRoomObject.image && !activeRoomObject.isSearched"
                        :src="activeRoomObject.image"
                        alt=""
                    />
                    <img
                        class="a-image --contain o-feed__image"
                        v-else-if="activeRoomObject.imageSearched && activeRoomObject.isSearched"
                        :src="activeRoomObject.imageSearched"
                        alt=""
                    />
                    <p class="a-text">{{ activeRoomObject.name }}</p>
                    <template v-if="activeRoomObject.isSearched">
                        <template v-if="activeRoomObject.items.length">
                            contains:
                            <p v-for="lootItem in activeRoomObject.items" :key="lootItem.id" class="a-text">
                                {{ lootItem.name }} <button @click="getItem(activeRoomObject, lootItem)">take</button>
                            </p>
                        </template>
                        <p v-else>empty!</p>
                    </template>
                    <button
                        v-if="!activeRoomObject.isSearched"
                        @click="openContainer(activeRoomObject)"
                        class="a-button action__button"
                    >
                        Open
                    </button>
                </div>
            </template>
            <template v-else>
                <img v-if="currentRoom.image" class="a-image" :src="currentRoom.image" alt="" />
                <div v-html="currentRoom.description"></div>
                <p v-if="currentRoom.roomObjects.length">
                    <!-- <template v-for="(roomObject, index) in currentRoom.roomObjects" :key="roomObject.id"
                        >{{ roomObject.isSearched && roomObject.items.length === 0 ? 'empty ' : undefined
                        }}{{ roomObject.name
                        }}{{ index === currentRoom.roomObjects.length - 1 ? '' : ',\&nbsp;' }}</template
                    > -->
                </p>
                <p v-for="feedItem in feedList" :key="feedItem">{{ feedItem }}</p>
            </template>
        </ul>
    </div>
</template>
