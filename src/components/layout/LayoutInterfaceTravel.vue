<script setup lang="ts">
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { computed, onMounted } from 'vue'
import { EDirections } from '@/enums/EDirections'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import localtions from '@/assets/json/locations.json'
import router from '@/router'
import { useFeedStore } from '@/stores/useFeed'
import AIcon from '@/components/AIcon.vue'
import KnapsackIcon from '../icons/KnapsackIcon.vue'
import CharacterScreenIcon from '../icons/CharacterScreenIcon.vue'
import { usePlayerPositionStore } from '@/stores/usePlayerPosition'
const sceneManager = useSceneManagerStore()
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()
const isSearched = computed(() => sceneManager.activeRoom?.isSearched)
const playerPosition = usePlayerPositionStore()
const feedStore = useFeedStore()
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
    if (!sceneManager.activeRoom || !sceneManager.activeRoom.id || !sceneManager.activeRoom || !sceneManager.activeRoom) {
        console.error('Cant go to Town - missing object')
        return
    }
    if (sceneId === 'town') {
        sceneManager.createLocations(sceneId)
        router.push({ name: 'town' })
        return
    }
    await sceneManager.saveScene({x: playerPosition.coords.x, y: playerPosition.coords.y}, sceneManager.sceneList)
}

const move = async (index: number) => {    // if ()  

    if (!sceneManager.activeRoom) {
        return
    }

    if (index === EDirections.North) {
        playerPosition.updateCoords(playerPosition.coords.x, playerPosition.coords.y - 1)
    } else if (index === EDirections.East) {
        playerPosition.updateCoords(playerPosition.coords.x - 1, playerPosition.coords.y)
    } else if (index === EDirections.South) {
        playerPosition.updateCoords(playerPosition.coords.x, playerPosition.coords.y + 1)
    } else if (index === EDirections.West) {
        playerPosition.updateCoords(playerPosition.coords.x + 1, playerPosition.coords.y)
    }

    sceneManager.changeActiveRoom(playerPosition.coords.x, playerPosition.coords.y)

    if (!sceneManager.activeRoom) {
        console.error('No current Room')
        return
    }
    await sceneManager.saveScene({x: playerPosition.coords.x, y: playerPosition.coords.y}, sceneManager.sceneList)
}

// const moveTo = async (sceneId: string, roomId: string) => {
//     if (!sceneManager.activeRoom) {
//         return
//     }

//     if (sceneId !== sceneManager.activeRoom.id) {
//         const existingScene = sceneList.value.find((scene) => scene.id.toString() === sceneId.toString())
//         if (existingScene) {
//             setMapLocation(existingScene)
//             sceneManager.activeRoom.changeActiveRoom(roomId)
//             return
//         }
//         createLocations(sceneId)
//         sceneManager.activeRoom.changeActiveRoom(roomId)
//         return
//     }

//     if (parseInt(roomId) === EDirections.Wall) {
//         console.error('wall')
//         return
//     }

//     sceneManager.activeRoom.changeActiveRoom(roomId)

//     if (!sceneManager.activeRoom) {
//         console.error('No current Room')
//         return
//     }
//     await saveScene(sceneManager.activeRoom.id, sceneManager.activeRoom.id, sceneManager.activeRoom)
// }

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
    if (!sceneManager.activeRoom || !sceneManager.activeRoom) {
        console.error('SEARCH ROOM: no current room')
        return
    }
    sceneManager.activeRoom.searchRoom()
}

onMounted(() => {
    addKeybindings()
})
</script>

<template>
    <div v-if="sceneManager.activeRoom" class="o-interface">
        <div class="o-interface__row o-interface__objectActions">
            <template v-for="roomObject in sceneManager.activeRoom?.roomObjects" :key="roomObject.id">
                <button
                    v-if="feedStore.activeRoomObject?.id !== roomObject.id"
                    class="a-button action__button"
                    @click="feedStore.setActiveRoomObject(roomObject)"
                >
                    Search {{ roomObject.name }}
                </button>
            </template>
            <button
                v-if="feedStore.activeRoomObject"
                class="a-button action__button"
                @click="feedStore.setActiveRoomObject(undefined)"
            >
                Description
            </button>
            <button class="a-button action__button" v-if="!isSearched" @click="searchRoom">Search Room</button>
        </div>
        <div class="o-interface__row o-interface__directionWrapper">
            <template v-for="(destinationId, index) in 4" :key="index">
                <button
                    v-if="destinationId !== -1 && typeof destinationId === 'number'"
                    class="a-button action__button"
                    @click="move(index)"
                >
                    {{ directionButton(destinationId, index) }} 
                </button>
            </template>

            <template v-for="(destinationId, index) in sceneManager.activeRoom?.exits" :key="index">
                <button
                    class="a-button action__button"
                    v-if="typeof destinationId !== 'number' && destinationId.sceneId !== 'town'"
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
