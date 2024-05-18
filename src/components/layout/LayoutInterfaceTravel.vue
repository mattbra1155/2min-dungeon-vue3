<script setup lang="ts">
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { computed, onMounted, ref, toRaw } from 'vue'
import { EDirections } from '@/enums/EDirections'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import localtions from '@/assets/json/locations.json'
import router from '@/router'
import { useFeedStore } from '@/stores/useFeed'
import AIcon from '@/components/AIcon.vue'
import KnapsackIcon from '../icons/KnapsackIcon.vue'
import CharacterScreenIcon from '../icons/CharacterScreenIcon.vue'
import { usePlayerPositionStore } from '@/stores/usePlayerPosition'
import { diceRollK100 } from '@/assets/scripts/diceRoll'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'
import { ETurnState } from '@/enums/ETurnState'
import { useTurn } from '@/composables/useTurn'
import { useRandomEncounters } from '@/stores/useRandomEncounters'
import { useInstanceManagerStore } from '@/stores/useInstanceManager'
import { Room } from '@/assets/models/RoomModel'
import { Store } from 'pinia'
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()
const { setMonsterList } = useTurn()
const playerPosition = usePlayerPositionStore()
const feedStore = useFeedStore()
const sceneManager = useSceneManagerStore()
const randomEncounters = useRandomEncounters()
const instanceManager = useInstanceManagerStore()

const isSearched = computed(() => sceneManager.activeRoom?.isSearched)
const closesTiles = ref<{
    north: Room | false
    east: Room | false
    south: Room | false
    west: Room | false
}>({
    north: false,
    east: false,
    south: false,
    west: false,

})

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

const getClosestTiles = () => {

    let manager: any = sceneManager
    if (instanceManager.isActive) {
        manager = instanceManager
    }
    console.log(manager);

    closesTiles.value.north = manager.getLocationData(playerPosition.coords.x, playerPosition.coords.y - 1)
    closesTiles.value.south = manager.getLocationData(playerPosition.coords.x, playerPosition.coords.y + 1)
    closesTiles.value.east = manager.getLocationData(playerPosition.coords.x + 1, playerPosition.coords.y)
    closesTiles.value.west = manager.getLocationData(playerPosition.coords.x - 1, playerPosition.coords.y)

    if (closesTiles.value.north) {
        feedStore.setTravelFeedItem(`N: ${closesTiles.value.north.name}`)
    }
    if (closesTiles.value.east) {
        feedStore.setTravelFeedItem(`E: ${closesTiles.value.east.name}`)
    }
    if (closesTiles.value.south) {
        feedStore.setTravelFeedItem(`S: ${closesTiles.value.south.name}`)
    }
    if (closesTiles.value.west) {
        feedStore.setTravelFeedItem(`W: ${closesTiles.value.west.name}`)
    }
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
    await sceneManager.saveScene({ x: playerPosition.coords.x, y: playerPosition.coords.y }, sceneManager.sceneList)
}

const move = async (index: number) => {
    let manager: any = sceneManager

    if (instanceManager.isActive) {
        manager = instanceManager
    }

    if (!manager) {
        return
    }

    manager.loadingArea = true

    const savedPlayerPosition = structuredClone(toRaw(playerPosition.coords))
    let newCoords = {
        x: 0,
        y: 0
    }
    feedStore.resetTravelFeed()

    if (index === EDirections.North) {
        newCoords = {
            x: playerPosition.coords.x,
            y: playerPosition.coords.y - 1
        }
        feedStore.setTravelFeedItem(`You move north`)
    } else if (index === EDirections.East) {
        newCoords = {
            x: playerPosition.coords.x + 1,
            y: playerPosition.coords.y
        }
        feedStore.setTravelFeedItem(`You move east`)
    } else if (index === EDirections.South) {
        newCoords = {
            x: playerPosition.coords.x,
            y: playerPosition.coords.y + 1
        }
        feedStore.setTravelFeedItem(`You move south`)
    } else if (index === EDirections.West) {
        newCoords = {
            x: playerPosition.coords.x - 1,
            y: playerPosition.coords.y
        }
        feedStore.setTravelFeedItem(`You move west`)
    }
    playerPosition.updateCoords(newCoords.x, newCoords.y)

    console.log(manager);

    const changedRoom = manager.changeActiveRoom(playerPosition.coords.x, playerPosition.coords.y)


    if (!changedRoom) {
        // if cant move to the next tile return the player to the previous place
        console.error('No current Room')
        playerPosition.updateCoords(savedPlayerPosition.x, savedPlayerPosition.y)
        manager.changeActiveRoom(playerPosition.coords.x, playerPosition.coords.y)
        feedStore.setTravelFeedItem(`You travel back.`)
    }

    const location = manager.getLocationData(playerPosition.coords.x, playerPosition.coords.y)

    if (location) {
        // check if there is a monster here
        randomEncounters.rollEncounter(location.id)
    }


    feedStore.setTravelFeedItem(`You have entered ${manager.activeRoom?.name}.`)
    feedStore.setTravelFeedItem(`${manager.activeRoom?.description}`)

    // Get closes tiles names
    getClosestTiles()

    await manager.saveScene({ x: playerPosition.coords.x, y: playerPosition.coords.y }, manager.sceneList)
    setTimeout(() => {
        manager.loadingArea = false
    }, 800)

}

const directionButton = (index: number) => {
    let destination = undefined
    console.log(index);

    if (index === EDirections.North) {
        destination = Object.entries(EDirections).find((dir) => dir[0] === index.toString())?.[1]
    } else if (index === EDirections.East) {
        destination = Object.entries(EDirections).find((dir) => dir[0] === index.toString())?.[1]
    } else if (index === EDirections.South) {
        destination = Object.entries(EDirections).find((dir) => dir[0] === index.toString())?.[1]
    } else if (index === EDirections.West) {
        destination = Object.entries(EDirections).find((dir) => dir[0] === index.toString())?.[1]
    }


    console.log(destination);
    return destination

}

const searchRoom = () => {
    if (!sceneManager.activeRoom || !sceneManager.activeRoom) {
        console.error('SEARCH ROOM: no current room')
        return
    }
    sceneManager.activeRoom.searchRoom()
}

const enterInstance = () => {
    if (!sceneManager.activeRoom) {
        return
    }
    instanceManager.isActive = true

    instanceManager.createLocations(sceneManager.activeRoom.id, 'gate')

    feedStore.resetTravelFeed()
    feedStore.setTravelFeedItem(`You have entered ${instanceManager.activeRoom?.name}`)
    getClosestTiles()
}
onMounted(() => {
    addKeybindings()
})
</script>

<template>
    <div v-if="sceneManager.activeRoom" class="o-interface">
        <div class="o-interface__row o-interface__objectActions">
            <template v-for="roomObject in sceneManager.activeRoom?.roomObjects" :key="roomObject.id">
                <button v-if="feedStore.activeRoomObject?.id !== roomObject.id" class="a-button action__button"
                    @click="feedStore.setActiveRoomObject(roomObject)">
                    Search {{ roomObject.name }}
                </button>
            </template>
            <button v-if="feedStore.activeRoomObject" class="a-button action__button"
                @click="feedStore.setActiveRoomObject(undefined)">
                Description
            </button>
            <button class="a-button action__button" v-if="!isSearched" @click="searchRoom">Search Room</button>
            <button class="a-button action__button" @click="enterInstance()"
                v-if="!['road', 'grassland', 'hinterlands', 'mountains', 'water', 'fields', 'forest'].includes(sceneManager.activeRoom.id)">
                Enter {{ sceneManager.activeRoom.name }}
            </button>
            <button class="a-button action__button" @click="$router.push({ name: 'town' })"
                v-if="sceneManager.activeRoom.id === 'oakwood'">
                Enter {{ sceneManager.activeRoom.name }}
            </button>
        </div>
        <div class="o-interface__row o-interface__directionWrapper">
            <template v-for="(destinationId, index) in 4" :key="index">
                <button class="a-button action__button" @click="move(index)">
                    {{ directionButton(index) }}
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
