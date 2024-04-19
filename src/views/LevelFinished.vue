<script setup lang="ts">
import { useLoot } from '@/composables/useLoot'
import { usePlayer } from '@/composables/usePlayer'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { useRouter } from 'vue-router'
import { AllItemTypes } from '@/interfaces/IItem'
import { Gold } from '@/assets/models/itemsModel'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import localforage from 'localforage'
import { onMounted } from 'vue'
import { useFeedStore } from '@/stores/useFeed'

const { updateTurnStateMachine, resetTurn } = useTurn()
const router = useRouter()
const { player } = usePlayer()
const { lootList, generateLoot } = useLoot()
const { activeRoom, saveScene } = useSceneManagerStore()
const { updateGameState } = useGameStateManager()
const feedStore = useFeedStore()

updateGameState(EGameState.LevelCleared)
updateTurnStateMachine(ETurnState.Init)
feedStore.resetBattleFeed()

const setRoomExploredStatus = async () => {
    if (!activeRoom.value) {
        return
    }
    if (!activeRoom.value.currentRoom) {
        return
    }

    activeRoom.value.currentRoom.isExplored = true
    console.log(activeRoom.value.currentRoom)

    await saveScene(activeRoom.value.id, activeRoom.value.currentRoom.id, activeRoom.value.roomList)
    resetTurn()
}

const takeItem = (lootItem: AllItemTypes | Gold) => {
    const isAdded = player.value.inventory.addItem(lootItem, player.value.id)
    if (!isAdded.status) {
        console.log(isAdded.message)
        return
    }
    const indexOfItem = lootList.value.findIndex((item) => item.id === lootItem.id)
    lootList.value.splice(indexOfItem, 1)
}

const closeScreen = async () => {
    router.push({ name: 'home', state: { nextLevel: true } })
    updateGameState(EGameState.Travel)
}

onMounted(async () => {
    await setRoomExploredStatus()
})
</script>

<template>
    <div class="m-main o-levelFinished">
        <div class="o-levelFinished__textContainer">
            <h1 class="o-levelFinished__title">LEVEL CLEARED</h1>
            <template v-if="!lootList.length">
                <p>search for loot</p>
                <button @click="generateLoot()">Search</button>
            </template>
            <template v-else>
                <p class="o-levelFinished__text">you found</p>
                <div v-for="lootItem in lootList" :key="lootItem.id" class="m-lootCard">
                    <p>name: {{ lootItem.name }}</p>
                    <p>type: {{ lootItem.type }}</p>
                    <button @click="takeItem(lootItem)">take</button>
                </div>
            </template>
            <button @click="closeScreen" class="a-button">Continue</button>
        </div>
    </div>
</template>
