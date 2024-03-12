<script setup lang="ts">
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { computed, onMounted } from 'vue'
import { EDirections } from '@/enums/EDirections'
import { useSceneManager } from '@/composables/useSceneManager'
import localtions from '@/assets/json/locations.json'
import router from '@/router'
import { useFeed } from '@/composables/useFeed'
import AIcon from '@/components/AIcon.vue'
import KnapsackIcon from '../icons/KnapsackIcon.vue'
import CharacterScreenIcon from '../icons/CharacterScreenIcon.vue'
const { activeRoomObject, setActiveRoomObject } = useFeed()
const { activeScene, saveScene, sceneList, createScene, setScene } = useSceneManager()
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
const getLocationName = (locationId: string) => {
    const locationName = localtions.find((scene) => scene.id === locationId.toString())?.name

    if (locationName) {
        return locationName
    } else {
        return 'Error - no Name'
    }
}

const moveToTown = async (sceneId: string) => {
    if (!activeScene.value || !activeScene.value.id || !activeScene.value.currentRoom || !activeScene.value.roomList) {
        console.error('Cant go to Town - missing object')
        return
    }
    if (sceneId === 'town') {
        createScene(sceneId)
        router.push({ name: 'town' })
        return
    }
    await saveScene(activeScene.value.id, activeScene.value.currentRoom.id, activeScene.value.roomList)
}

const moveTo = async (sceneId: string, roomId: string) => {
    if (!activeScene.value) {
        return
    }

    if (sceneId !== activeScene.value.id) {
        const existingScene = sceneList.value.find((scene) => scene.id.toString() === sceneId.toString())
        if (existingScene) {
            setScene(existingScene)
            activeScene.value.changeCurrentRoom(roomId)
            return
        }
        createScene(sceneId)
        activeScene.value.changeCurrentRoom(roomId)
        return
    }

    if (parseInt(roomId) === EDirections.Wall) {
        console.error('wall')
        return
    }

    activeScene.value.changeCurrentRoom(roomId)

    if (!activeScene.value.currentRoom) {
        console.error('No current Room')
        return
    }
    await saveScene(activeScene.value.id, activeScene.value.currentRoom.id, activeScene.value.roomList)
}

const directionButton = (directionId: number, index: number) => {
    if (index === EDirections.North) {
        return Object.entries(EDirections).find((dir) => dir[0] === index.toString())?.[1]
    } else if (index === EDirections.East) {
        return Object.entries(EDirections).find((dir) => dir[0] === index.toString())?.[1]
    } else if (index === EDirections.South) {
        return Object.entries(EDirections).find((dir) => dir[0] === index.toString())?.[1]
    } else if (index === EDirections.West) {
        return Object.entries(EDirections).find((dir) => dir[0] === index.toString())?.[1]
    }
}

const searchRoom = () => {
    if (!activeScene.value || !activeScene.value.currentRoom) {
        console.error('SEARCH ROOM: no current room')
        return
    }
    activeScene.value.currentRoom.searchRoom()
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
                    @click="setActiveRoomObject(roomObject)"
                >
                    Search {{ roomObject.name }}
                </button>
            </template>
            <button v-if="activeRoomObject" class="a-button action__button" @click="setActiveRoomObject(null)">
                Room description
            </button>
            <button class="a-button action__button" v-if="!isSearched" @click="searchRoom">Search Room</button>
        </div>
        <div class="o-interface__row o-interface__directionWrapper">
            <template v-for="(destinationId, index) in activeScene.currentRoom?.exits" :key="index">
                <button
                    v-if="destinationId !== -1 && typeof destinationId === 'number'"
                    class="a-button action__button"
                    @click="moveTo(activeScene.id, destinationId.toString())"
                >
                    {{ directionButton(destinationId, index) }}
                </button>
            </template>

            <template v-for="(destinationId, index) in activeScene.currentRoom?.exits" :key="index">
                <button
                    class="a-button action__button"
                    v-if="typeof destinationId !== 'number' && destinationId.sceneId !== 'town'"
                    @click="moveTo(destinationId.sceneId, destinationId.roomId)"
                >
                    {{ getLocationName(destinationId.sceneId) }}
                </button>
                <button
                    class="a-button action__button"
                    v-if="typeof destinationId !== 'number' && destinationId.sceneId === 'town'"
                    @click="moveToTown(destinationId.sceneId)"
                >
                    {{ destinationId.sceneId }}
                </button>
            </template>
        </div>
        <div class="o-interface__row">
            <button id="inventoryButton" type="button" class="a-button action__button" @click="toggleInventory">
                <AIcon :icon="KnapsackIcon" />
            </button>
            <button class="a-button action__button" @click="toggleCharacterScreen">
                <AIcon :icon="CharacterScreenIcon" />
            </button>
        </div>
    </div>
</template>
