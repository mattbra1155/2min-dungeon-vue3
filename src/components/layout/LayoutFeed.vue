<script setup lang="ts">
import { RoomObject } from '@/assets/models/RoomObjectModel'
import { useSceneManager } from '@/composables/useSceneManager'
import { computed } from 'vue'
const { activeScene } = useSceneManager()

const currentRoom = computed(() => activeScene.value?.currentRoom)
const isSearched = computed(() => currentRoom.value?.isSearched)
const openContainer = (item: RoomObject) => {
    console.log(item.items)
    item.setIsSearch(true)
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
                    {{ item.isSearched }}
                    <p class="a-text">{{ item.name }}</p>
                    <button @click="openContainer(item)" class="a-button action__button">Open</button>
                </div>
            </template>
        </ul>
    </div>
</template>
