<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoot } from '@/composables/useLoot'
import { ETurnState } from '@/enums/ETurnState'
import { AllItemTypes } from '@/interfaces/IItem'
import { Gold } from '@/assets/models/itemsModel'
import { EGameState } from '@/enums/EGameState'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { useFeedStore } from '@/stores/useFeed'
import { usePlayerPositionStore } from '@/stores/usePlayerPosition'
import { lootLists } from '@/assets/data/lootList'
import { useTurnStore } from '@/stores/useTurn'
import { usePlayerStore } from '@/stores/usePlayer'
import { useGameStateStore } from '@/stores/useGameStateManager'
const turnStore = useTurnStore()
const router = useRouter()
const playerStore = usePlayerStore()
const { isLootSearched, lootList, weightedRandom } = useLoot()
const sceneManager = useSceneManagerStore()
const playerPosition = usePlayerPositionStore()
const gameStateStore = useGameStateStore()
const feedStore = useFeedStore()
turnStore.updateTurnStateMachine(ETurnState.Disabled)
feedStore.resetBattleFeed()

const setRoomExploredStatus = async () => {
    if (!sceneManager.activeRoom) {
        return
    }

    sceneManager.activeRoom.isExplored = true
    console.log(sceneManager.activeRoom)

    if (playerPosition.coords.x === undefined || playerPosition.coords.y === undefined) {
        console.error('No previous player position')
        return
    }
    await sceneManager.saveScene({ x: playerPosition.coords.x, y: playerPosition.coords.y }, sceneManager.sceneList)
    turnStore.resetTurn()
}

const takeItem = (lootItem: AllItemTypes | Gold) => {
    if (!playerStore.player) {
        return
    }
    const isAdded = playerStore.player.inventory.addItem(lootItem, playerStore.player.id)
    if (!isAdded.status) {
        console.log(isAdded.message)
        return
    }
    const indexOfItem = lootList.value.findIndex((item) => item.id === lootItem.id)
    lootList.value.splice(indexOfItem, 1)
}

const closeScreen = async () => {
    isLootSearched.value = false
    router.push({ name: 'home', state: { nextLevel: true } })
    gameStateStore.updateGameState(EGameState.Travel)
}

onMounted(async () => {
    await setRoomExploredStatus()
})
</script>

<template>
    <div class="m-main o-levelFinished">
        <div class="o-levelFinished__textContainer">
            <h1 class="o-levelFinished__title">Enemies defeated!</h1>
            <template v-if="!isLootSearched">
                <p>Search for loot</p>
                <button class="a-button" @click="weightedRandom(lootLists.goblin), (isLootSearched = true)">
                    Search
                </button>
            </template>
            <template v-else>
                <p class="o-levelFinished__text">You found:</p>
                <transition-group name="fade">
                    <template v-if="lootList.length">
                        <div v-for="lootItem in lootList" :key="lootItem.id" class="m-lootCard">
                            <p>{{ lootItem.name }}</p>
                            <button class="m-lootCard__button" @click="takeItem(lootItem)">take</button>
                        </div>
                    </template>
                    <template v-else>Nothing interesting</template>
                </transition-group>
            </template>
            <button @click="closeScreen" class="a-button">Continue</button>
        </div>
    </div>
</template>
