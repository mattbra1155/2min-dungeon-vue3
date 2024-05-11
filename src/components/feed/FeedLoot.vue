<script setup lang="ts">
import { RoomObject } from '@/assets/models/RoomObjectModel'
import { usePlayer } from '@/composables/usePlayer'
import { AllItemTypes } from '@/interfaces/IItem'
import { useFeedStore } from '@/stores/useFeed'
import { ref } from 'vue'

const { player } = usePlayer()
const feedStore = useFeedStore()
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
</script>

<template>
    <div v-if="feedStore.activeRoomObject">
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
                        <button class="a-button" @click="getItem(feedStore.activeRoomObject!, lootItem)">take</button>
                    </p>
                </template>
                <p v-else>empty!</p>
            </template>
            <button
                v-if="!feedStore.activeRoomObject.isSearched"
                @click="openContainer(feedStore.activeRoomObject!)"
                class="a-button action__button"
            >
                {{ feedStore.activeRoomObject.isLocked ? 'Unlock' : 'Open' }}
            </button>
            <transition name="slide">
                <p v-if="containerMessage" class="test">{{ containerMessage }}</p>
            </transition>
        </div>
    </div>
</template>
