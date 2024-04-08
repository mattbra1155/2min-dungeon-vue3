<script setup lang="ts">
import { RoomObject } from '@/assets/models/RoomObjectModel'
import { useFeedStore } from '@/stores/useFeed'
import { usePlayer } from '@/composables/usePlayer'
import { useSceneManager } from '@/composables/useSceneManager'
import { AllItemTypes } from '@/interfaces/IItem'
import { computed, onMounted, ref, watch } from 'vue'

const feedStore = useFeedStore()
const { activeScene } = useSceneManager()
const { player } = usePlayer()
const currentRoom = computed(() => activeScene.value?.currentRoom)
const isSearched = computed(() => currentRoom.value?.isSearched)
const containerMessage = ref<string>()
const openContainer = (item: RoomObject) => {
    if (item.isLocked) {
        const canPlayerUnlock = item.unlock(player.value)
        if (canPlayerUnlock) {
            item.setIsSearch(true)
        } else {
            containerMessage.value = `You are unable to open the ${item.name}. You need a lockpicking skill.`
        }
        return
    }
    item.setIsSearch(true)
}
const getItem = (container: RoomObject, item: AllItemTypes) => {
    const itemToRemoveIndex = container.items.findIndex((findItem) => findItem.id === item.id)
    container.items.splice(itemToRemoveIndex, 1)
    player.value.inventory.addItem(item, player.value.id)
    if (!container.items.length) {
        feedStore.setTravelFeedItem(`You took everything from ${container.name}`)
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
            feedStore.setTravelFeedItem(`You searched this room already.`)
        }
    }
)

watch(
    () => containers.value,
    () => {
        feedStore.setTravelFeedItem(containers.value)
    }
)

onMounted(() => {
    feedStore.setTravelFeedItem('There is a chest in the room.')
})
</script>

<template>
    <div v-if="currentRoom" id="feed" class="o-feed">
        <ul id="feedContainer" class="o-feed__container">
            <img v-if="currentRoom.image" class="a-image" :src="currentRoom.image" alt="" />
            <div v-html="currentRoom.description"></div>
            <p v-for="feedItem in feedStore.feedTravelList" :key="feedItem">{{ feedItem }}</p>
        </ul>
    </div>
</template>
