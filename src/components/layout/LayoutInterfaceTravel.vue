<script setup lang="ts">
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { computed, onMounted } from 'vue'
import { EDirections } from '@/enums/EDirections'
import { Scene } from '@/assets/models/sceneModel'
import { useSceneManager } from '@/composables/useSceneManager'
import localtions from '@/assets/json/locations.json'
import router from '@/router'
import { RoomObject } from '@/assets/models/RoomObjectModel'
import { useFeed } from '@/composables/useFeed'
import { isRoomExit } from '@/assets/models/RoomModel'

const { activeRoomObject, setActiveRoomObject } = useFeed()
const { activeScene, saveScene, createScene } = useSceneManager()
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()
const isSearched = computed(() => activeScene.value?.currentRoom?.isSearched)

const addKeybindings = () => {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'i') {
            toggleInventory()
        }
        if (event.key === 'c') {
            toggleCharacterScreen()
        }
        if (event.key === 'w') {
            // player.value.moveTo()
        }
        if (event.key === 'd') {
            // toggleCharacterScreen()
        }
        if (event.key === 's') {
            // toggleCharacterScreen()
        }
        if (event.key === 'a') {
            // toggleCharacterScreen()
        }
    })
}

const moveTo = async (sceneId: string, roomId = '0') => {
    const sceneData = localtions.find((scene) => scene.id === sceneId)

    if (!activeScene.value) {
        return
    }
    if (!sceneData) {
        console.error('no Scene found')
        return
    }

    if (sceneId === 'town') {
        router.push({ name: 'town' })
        return
    }

    if (sceneId !== activeScene.value.id) {
        createScene(sceneId)
        console.error('WARNING: no room id set - changing room to 0')
        activeScene.value.changeCurrentRoom(roomId)
        return
    }

    if (parseInt(roomId) === EDirections.Wall) {
        console.log('wall')
        return
    }

    activeScene.value.changeCurrentRoom(roomId)

    if (!activeScene.value.currentRoom) {
        console.error('No current Room')
        return
    }
    await saveScene(activeScene.value.id, activeScene.value.currentRoom.id, activeScene.value.roomList)
}

const directionButton = (direction: number) =>
    Object.entries(EDirections).find((dir) => dir[0] === direction.toString())?.[1]

const searchRoom = () => {
    if (!activeScene.value || !activeScene.value.currentRoom) {
        console.error('SEARCH ROOM: no current room')
        return
    }
    activeScene.value.currentRoom.searchRoom()
}

const searchObject = (item: RoomObject) => {
    setActiveRoomObject(item)
}
onMounted(() => {
    addKeybindings()
})
</script>

<template>
    <div v-if="activeScene" class="o-interface">
        <div class="o-interface__row o-interface__objectActions">
            <template v-for="roomObject in activeScene.currentRoom?.roomObjects" :key="roomObject.id">
                <button
                    v-if="activeRoomObject?.id !== roomObject.id"
                    class="a-button action__button"
                    @click="searchObject(roomObject)"
                >
                    Search {{ roomObject.name }}
                </button>
            </template>
            <button class="a-button action__button" v-if="activeRoomObject" @click="setActiveRoomObject(null)">
                Room description
            </button>
        </div>
        <button class="a-button action__button" v-if="!isSearched" @click="searchRoom">Search Room</button>
        <div class="o-interface__row o-interface__directionWrapper">
            <template v-for="(destination, index) in activeScene.currentRoom?.exits" :key="index">
                <button
                    v-if="destination !== -1 && typeof destination === 'number'"
                    class="a-button action__button"
                    @click="moveTo(activeScene.id, destination.toString())"
                >
                    {{ directionButton(destination) }}
                </button>
            </template>

            <template v-for="(destinationId, index) in activeScene.currentRoom?.exits" :key="index">
                <button
                    class="a-button action__button"
                    v-if="typeof destinationId !== 'number'"
                    @click="moveTo(destinationId.sceneId, destinationId.roomId)"
                >
                    {{ destinationId.sceneId }}
                </button>
            </template>
        </div>
        <div class="o-interface__row">
            <button id="inventoryButton" type="button" class="a-button action__button" @click="toggleInventory">
                Inventory
            </button>
            <button class="a-button action__button" @click="toggleCharacterScreen">Character Screen</button>
        </div>
    </div>
</template>
