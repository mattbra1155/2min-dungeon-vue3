<script setup lang="ts">
import { useFeedStore } from '@/stores/useFeed'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { computed, onMounted, watch } from 'vue'

const feedStore = useFeedStore()
const sceneManager = useSceneManagerStore()

const containers = computed(() => {
    if (!sceneManager.activeRoom?.roomObjects.length) {
        return 'You see nothing worth taking.'
    }
    const items = sceneManager.activeRoom.roomObjects.map((roomObject) => {
        console.log(roomObject)

        const isEmpty = roomObject.isSearched && roomObject.items.length === 0 ? 'empty ' : ''
        const name = roomObject.name
        return `${isEmpty}${name}`
    })

    return `There is a ${items} here.`
})

watch(
    () => containers.value && sceneManager.activeRoom?.isSearched,
    () => {
        feedStore.setTravelFeedItem(containers.value)
    }
)

watch(
    () => sceneManager.activeRoom?.isSearched,
    (isSearched) => {
        if (isSearched) {
            feedStore.setTravelFeedItem(`You searched this room.`)
        }
    }
)
</script>

<template>
    <div
        v-if="sceneManager.activeRoom"
        id="feed"
        class="o-feed__travel"
        :class="{ '--loading': sceneManager.loadingArea }"
    >
        <transition name="fade">
            <ul v-if="!sceneManager.loadingArea" id="feedContainer" class="o-feed__container">
                <img v-if="sceneManager.activeRoom.image" class="a-image" :src="sceneManager.activeRoom.image" alt="" />
                <p v-for="feedItem in feedStore.feedTravelList" :key="feedItem">{{ feedItem }}</p>
            </ul>
        </transition>
    </div>
</template>
