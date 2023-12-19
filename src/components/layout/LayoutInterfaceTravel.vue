<script setup lang="ts">
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { computed, onMounted, reactive, ref } from 'vue'
import { usePlayer } from '@/composables/usePlayer'
import { EDirections } from '@/enums/EDirections'
import { Scene } from '@/assets/models/sceneModel'
import { Room, RoomExit } from '@/assets/models/RoomModel'
import { useSceneManager } from '@/composables/useSceneManager'
import localforage from 'localforage'
import { ERoomTypes } from '@/enums/ERoomTypes'
import localtions from '@/assets/json/locations.json'
import router from '@/router'

const { activeScene, setScene, saveScene } = useSceneManager()
const { turnNumber, updateTurnStateMachine, activeTurnState } = useTurn()
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()
const { player } = usePlayer()

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

const moveToRoom = async (roomId: EDirections) => {
    if (!activeScene.value) {
        return
    }
    if (roomId === EDirections.Wall) {
        console.log('wall')
        return
    }

    const getRoom = () => activeScene.value?.roomList.find((room) => parseInt(room.id) === roomId)

    const room = getRoom()
    if (!room) {
        return
    }
    activeScene.value.changeCurrentRoom(room.id)
    console.log('active room', activeScene.value.currentRoom)

    if (!activeScene.value.currentRoom) {
        console.error('No current Room')
        return
    }

    await saveScene(activeScene.value.id, activeScene.value.currentRoom.id)
}

const moveToScene = (sceneId: string) => {
    activeScene.value?.currentRoom
    const sceneData = localtions.find((scene) => scene.id === sceneId)

    if (!sceneData) {
        console.error('no Scene found')
        return
    }

    const scene = Object.assign(new Scene(), sceneData)

    console.log(scene)

    setScene(scene)

    if (sceneId === 'town') {
        router.push({ name: 'town' })
        return
    }
}

const directionButton = (direction: number) =>
    Object.entries(EDirections).find((dir) => dir[0] === direction.toString())?.[1]

onMounted(() => {
    addKeybindings()
})
</script>

<template>
    <div v-if="activeScene" class="o-interface">
        <button
            v-if="activeScene?.entityList.length"
            :disabled="activeTurnState !== ETurnState.Init"
            @click="updateTurnStateMachine(ETurnState.Init)"
            class="a-button"
        >
            start BATTLE
        </button>
        <div class="o-interface__row o-interface__directionWrapper">
            <template v-for="(direction, index) in activeScene.currentRoom?.exits" :key="index">
                <button v-if="direction !== -1" class="a-button action__button" @click="moveToRoom(direction)">
                    {{ directionButton(direction) }}
                </button>
            </template>

            <template v-for="sceneId in (activeScene.currentRoom as RoomExit)?.sceneLinks" :key="sceneId">
                <button
                    class="a-button action__button"
                    v-if="activeScene?.currentRoom?.type === ERoomTypes.Exit"
                    @click="moveToScene(sceneId)"
                >
                    {{ sceneId }}
                    Next Area
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
