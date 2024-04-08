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
        feedStore.setNotification(`You took everything from ${container.name}`)
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
            feedStore.setNotification(`You searched this room already.`)
        }
    }
)

watch(
    () => containers.value,
    () => {
        feedStore.setNotification(containers.value)
    }
)

onMounted(() => {
    feedStore.setNotification('There is a chest in the room.')
})
</script>

<template>
    <div v-if="currentRoom" id="feed" class="o-feed">
        <ul id="feedContainer" class="o-feed__container">
            <template v-if="feedStore.activeRoomObject">
                <div class="o-feed__item">
                    <img
                        class="a-image --contain o-feed__image"
                        v-if="feedStore.activeRoomObject.image && !feedStore.activeRoomObject.isSearched"
                        :src="feedStore.activeRoomObject.image"
                        alt=""
                    />
                    <img
                        class="a-image --contain o-feed__image"
                        v-else-if="feedStore.activeRoomObject.imageSearched && feedStore.activeRoomObject.isSearched"
                        :src="feedStore.activeRoomObject.imageSearched"
                        alt=""
                    />
                    <p class="a-text">
                        {{
                            feedStore.activeRoomObject.isLocked
                                ? `Locked ${feedStore.activeRoomObject.name}`
                                : feedStore.activeRoomObject.name
                        }}
                    </p>
                    <template v-if="feedStore.activeRoomObject.isSearched">
                        <template v-if="feedStore.activeRoomObject.items.length">
                            contains:
                            <p v-for="lootItem in feedStore.activeRoomObject.items" :key="lootItem.id" class="a-text">
                                {{ lootItem.name }}
                                <button class="a-button" @click="getItem(feedStore.activeRoomObject, lootItem)">
                                    take
                                </button>
                            </p>
                        </template>
                        <p v-else>empty!</p>
                    </template>
                    <button
                        v-if="!feedStore.activeRoomObject.isSearched"
                        @click="openContainer(feedStore.activeRoomObject)"
                        class="a-button action__button"
                    >
                        {{ feedStore.activeRoomObject.isLocked ? 'Unlock' : 'Open' }}
                    </button>
                    <transition name="slide">
                        <p v-if="containerMessage" class="test">{{ containerMessage }}</p>
                    </transition>
                </div>
            </template>

            <template v-else>
                <img v-if="currentRoom.image" class="a-image" :src="currentRoom.image" alt="" />
                <div v-html="currentRoom.description"></div>
                <p v-for="feedItem in feedStore.feedList" :key="feedItem">{{ feedItem }}</p>
            </template>
        </ul>
    </div>
</template>
