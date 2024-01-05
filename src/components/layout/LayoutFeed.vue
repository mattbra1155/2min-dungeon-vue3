<script setup lang="ts">
import { RoomObject } from '@/assets/models/RoomObjectModel'
import { usePlayer } from '@/composables/usePlayer'
import { useSceneManager } from '@/composables/useSceneManager'
import { AllItemTypes } from '@/interfaces/IItem'
import { computed } from 'vue'
const { activeScene } = useSceneManager()

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
    <div id="feed" class="o-feed">
        <ul id="feedContainer" class="o-feed__container">
            <template v-for="item in currentRoom?.roomObjects" :key="item.id">
                <div v-if="isSearched" class="o-feed__item">
                    <img
                        class="a-image --contain o-feed__image"
                        v-if="item.image && !item.isSearched"
                        :src="item.image"
                        alt=""
                    />
                    <img
                        class="a-image --contain o-feed__image"
                        v-else-if="item.imageSearched && item.isSearched"
                        :src="item.imageSearched"
                        alt=""
                    />
                    <p class="a-text">{{ item.name }}</p>
                    <template v-if="item.isSearched">
                        <template v-if="item.items.length">
                            contains:
                            <p v-for="lootItem in item.items" :key="lootItem.id" class="a-text">
                                {{ lootItem.name }} <button @click="getItem(item, lootItem)">take</button>
                            </p>
                        </template>
                        <p v-else>empty!</p>
                    </template>
                    <button v-if="!item.isSearched" @click="openContainer(item)" class="a-button action__button">
                        Open
                    </button>
                </div>
            </template>
        </ul>
    </div>
</template>
