<script setup lang="ts">
import { RoomObject } from '@/assets/models/RoomObjectModel'
import { useFeed } from '@/composables/useFeed'
import { usePlayer } from '@/composables/usePlayer'
import { useSceneManager } from '@/composables/useSceneManager'
import { AllItemTypes } from '@/interfaces/IItem'
import { computed } from 'vue'
const { activeScene } = useSceneManager()
const { activeRoomObject } = useFeed()

const { player } = usePlayer()
const currentRoom = computed(() => activeScene.value?.currentRoom)
const isSearched = computed(() => currentRoom.value?.isSearched)
const openContainer = (item: RoomObject) => item.setIsSearch(true)
const getItem = (container: RoomObject, item: AllItemTypes) => {
    const itemToRemoveIndex = container.items.findIndex((findItem) => findItem.id === item.id)
    container.items.splice(itemToRemoveIndex, 1)
    player.value.inventory.addItem(item, player.value.id)
}
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
                <div v-html="currentRoom.description"></div>
                <p v-if="currentRoom.roomObjects.length">
                    There is a
                    <template v-for="(roomObject, index) in currentRoom.roomObjects" :key="roomObject.id"
                        >{{ roomObject.isSearched && roomObject.items.length === 0 ? 'empty ' : '' }}{{ roomObject.name
                        }}{{ index === currentRoom.roomObjects.length - 1 ? '' : ',\&nbsp;' }}</template
                    >
                    in the room.
                </p>
                <p v-if="isSearched">You searched this room already</p>
            </template>
        </ul>
    </div>
</template>
