<script setup lang="ts">
import AIcon from '@/components/AIcon.vue'
import KnapsackIcon from '../icons/KnapsackIcon.vue'
import CharacterScreenIcon from '../icons/CharacterScreenIcon.vue'
import { computed, onMounted, toRaw } from 'vue'
import router from '@/router'
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { EDirections } from '@/enums/EDirections'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { useFeedStore } from '@/stores/useFeed'
import { usePlayerPositionStore } from '@/stores/usePlayerPosition'
import { useRandomEncounters } from '@/stores/useRandomEncounters'
import { playAudio } from '@/helpers/playAudio'
import { EGameState } from '@/enums/EGameState'
import { Container } from '@/assets/models/RoomObjectModel'
import { useGlobalStore } from '@/stores/useGlobal'
import { ELocationTypes } from '@/enums/ELocationTypes'
import { useGameStateStore } from '@/stores/useGameStateManager'

const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()
const playerPosition = usePlayerPositionStore()
const feedStore = useFeedStore()
const sceneManager = useSceneManagerStore()
const randomEncounters = useRandomEncounters()
const { updateGameState } = useGameStateStore()
const globalStore = useGlobalStore()
const isSearched = computed(() => sceneManager.activeRoom?.isSearched)

const addKeybindings = () => {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'i') {
            toggleInventory()
        }
        if (event.key === 'c') {
            toggleCharacterScreen()
        }
        if (event.key === 'w') {
            // playerStore.player.moveTo()
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

type DirectionData = {
    dx: number
    dy: number
    msg: string
}

const directionMap = new Map<EDirections, DirectionData>([
    [EDirections.North, { dx: 0, dy: -1, msg: 'You move north' }],
    [EDirections.East, { dx: 1, dy: 0, msg: 'You move east' }],
    [EDirections.South, { dx: 0, dy: 1, msg: 'You move south' }],
    [EDirections.West, { dx: -1, dy: 0, msg: 'You move west' }],
])

const move = async (index: number) => {
    if (!sceneManager || playerPosition.coords.x === undefined || playerPosition.coords.y === undefined) {
        return
    }

    const direction = directionMap.get(index)
    if (!direction) return

    const { dx, dy, msg } = direction
    const oldCoords = structuredClone(toRaw(playerPosition.coords))
    const newX = oldCoords.x + dx
    const newY = oldCoords.y + dy

    globalStore.isMoving = true
    sceneManager.loadingArea = true

    const footsteps =
        Math.random() <= 0.5
            ? ['footsteps/Steps_dirt-001.ogg', 'footsteps/Steps_dirt-002.ogg', 'footsteps/Steps_dirt-003.ogg']
            : ['footsteps/Steps_dirt-004.ogg', 'footsteps/Steps_dirt-005.ogg', 'footsteps/Steps_dirt-006.ogg']

    playAudio(footsteps)
    feedStore.resetTravelFeed()
    feedStore.setTravelFeedItem(msg)

    playerPosition.updateCoords(newX, newY)

    const canChangeRoom = await sceneManager.checkIfChangeRoomIsPossible(newX, newY)

    if (!canChangeRoom) {
        console.error('No current Room')
        if (oldCoords.x === undefined || oldCoords.y === undefined) {
            console.error('No previous player position')
            return
        }

        playerPosition.updateCoords(oldCoords.x, oldCoords.y)
        await sceneManager.checkIfChangeRoomIsPossible(oldCoords.x, oldCoords.y)
        feedStore.setTravelFeedItem(`You travel back.`)
        console.log('rr')

        return
    }

    const location = sceneManager.getLocationData(newX, newY)
    if (location) {
        randomEncounters.rollEncounter(location.id as ELocationTypes)
    }

    feedStore.setTravelFeedItem(`You have entered ${sceneManager.activeRoom?.name}.`)
    feedStore.setTravelFeedItem(`${sceneManager.activeRoom?.description}`)

    sceneManager.getClosestTiles()
    await sceneManager.saveScene({ x: newX, y: newY }, sceneManager.sceneList)

    setTimeout(() => {
        sceneManager.loadingArea = false
        globalStore.isMoving = false
    }, 800)
}

const directionButton = (index: number) => Object.entries(EDirections).find(([key]) => key === index.toString())?.[1]

const searchRoom = () => {
    if (!sceneManager.activeRoom || !sceneManager.activeRoom) {
        console.error('SEARCH ROOM: no current room')
        return
    }
    sceneManager.activeRoom.searchRoom()
}

const enterInstance = async (instanceId: string, entryId: string) => {
    if (!sceneManager.activeRoom || !instanceId || !entryId) {
        return
    }
    globalStore.isMoving = true

    if (instanceId === 'overworld') {
        const exitLocation = sceneManager.sceneList.find((location: any) => location.id === entryId)

        if (!exitLocation) {
            console.error('no exit location found')
            globalStore.isMoving = false
            return
        }
        sceneManager.instance = undefined

        sceneManager.setActiveLocation(exitLocation)
        feedStore.resetTravelFeed()
        feedStore.setTravelFeedItem(`You have entered ${sceneManager.activeRoom?.name}`)
        feedStore.setTravelFeedItem(`${sceneManager.activeRoom?.description}`)
        sceneManager.getClosestTiles()
        globalStore.isMoving = false
        return
    }

    feedStore.resetTravelFeed()
    feedStore.setTravelFeedItem(`You have entered ${sceneManager.activeRoom?.name}`)
    feedStore.setTravelFeedItem(`${sceneManager.activeRoom?.description}`)
    sceneManager.getClosestTiles()
    globalStore.isMoving = false
}

const openContainer = (container: Container) => {
    globalStore.isMoving = true
    updateGameState(EGameState.Loot)
    feedStore.setActiveRoomObject(container)
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
                    v-if="feedStore.activeRoomObject?.id !== roomObject.id && sceneManager.activeRoom.isSearched"
                    class="a-button action__button"
                    @click="openContainer(roomObject)"
                >
                    Search {{ roomObject.name }}
                </button>
            </template>
            <button class="a-button action__button" v-if="!isSearched" @click="searchRoom">Search Room</button>
            <template v-if="sceneManager.activeRoom && sceneManager.activeRoom.connectedLocation !== undefined">
                <button
                    v-if="sceneManager.activeRoom.connectedLocation"
                    class="a-button action__button"
                    @click="
                        enterInstance(
                            sceneManager.activeRoom?.connectedLocation?.id!,
                            sceneManager.activeRoom?.connectedLocation?.entryId!
                        )
                    "
                >
                    Enter {{ sceneManager.activeRoom?.name }}
                </button>
            </template>
            <button
                v-if="sceneManager.activeRoom.id === 'oakwood'"
                class="a-button action__button"
                @click="router.push({ name: 'town' })"
                :disabled="globalStore.isMoving"
            >
                Enter {{ sceneManager.activeRoom.name }}
            </button>
        </div>
        <div class="o-interface__row o-interface__directionWrapper">
            <template v-for="(destinationId, index) in 4" :key="index">
                <button class="a-button action__button" @click="move(index)" :disabled="globalStore.isMoving">
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
