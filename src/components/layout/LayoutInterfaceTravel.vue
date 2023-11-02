<script setup lang="ts">
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { computed, onMounted, reactive, ref } from 'vue'
import { usePlayer } from '@/composables/usePlayer'
import { EDirections } from '@/enums/EDirections'
import { Scene } from '@/assets/models/sceneModel'
import { Room } from '@/assets/models/RoomModel'
import { useSceneManager } from '@/composables/useSceneManager'

const { activeScene } = useSceneManager()
const { turnModel } = useTurn()
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

const moveRoom = (roomId: EDirections) => {
    if (!activeScene.value) {
        return
    }
    if (roomId === EDirections.Wall) {
        console.log('wall')
        return
    }
    const getRoom = () => activeScene.value?.roomList.find((room) => room.id === roomId)

    const room = getRoom()
    if (!room) {
        return
    }
    activeScene.value.changeCurrentRoom(room)
}

onMounted(() => {
    addKeybindings()
})
</script>

<template>
    <div class="o-interface">
        <button
            v-if="activeScene?.entityList.length"
            :disabled="turnModel.activeTurnState !== ETurnState.Init"
            @click="turnModel.updateTurnStateMachine(ETurnState.Init)"
            class="a-button"
        >
            start BATTLE
        </button>
        <div class="o-interface__row o-interface__directionWrapper">
            <template v-for="(direction, index) in activeScene?.currentRoom?.exits" :key="index">
                <button v-if="direction !== -1" class="a-button action__button" @click="moveRoom(direction)">
                    {{ Object.entries(EDirections).find((dir) => dir[1] === direction)?.[0] }}
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
