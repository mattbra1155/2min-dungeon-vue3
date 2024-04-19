<script setup lang="ts">
import { useFeedStore } from '@/stores/useFeed'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { computed, onMounted, watch } from 'vue'

const feedStore = useFeedStore()
const sceneManager = useSceneManagerStore()
const currentRoom = computed(() => sceneManager.activeRoom)
const isSearched = computed(() => currentRoom.value?.isSearched)

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
