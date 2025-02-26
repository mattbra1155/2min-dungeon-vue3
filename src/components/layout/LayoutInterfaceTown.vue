<script setup lang="ts">
import router from '@/router'
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { computed, onMounted, toRefs } from 'vue'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { useShop } from '@/composables/useShop'
import { EGameState } from '@/enums/EGameState'
import { Town } from '@/assets/models/sceneTownModel'
import { useGameStateStore } from '@/stores/useGameStateManager'

const sceneManager = useSceneManagerStore()
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()
const { setActiveShop } = useShop()
const gameStateStore = useGameStateStore()

const props = defineProps<{
    town: Town
}>()

const { town } = toRefs(props)
const lastScene = computed(() => sceneManager.sceneList.findLast((el: any) => el))

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

// MOVE TOWN TO COMPONENT

const exitTown = () => {
    const townEntry = sceneManager.sceneList.find((location: any) => location.id === 'oakwood')

    gameStateStore.activeGameState = EGameState.Travel
    town.value.activeShopId = undefined
    router.push({ name: 'home' })
}

const enterShop = (shopId: string) => {
    town.value.activeShopId = shopId
    setActiveShop(shopId)
}

onMounted(() => {
    addKeybindings()
})
</script>

<template>
    <div v-if="sceneManager.activeRoom && lastScene" class="o-interface --town">
        <button class="a-button action__button" @click="exitTown()">Leave Town</button>
        <div class="o-interface__row">
            <button
                v-for="shop in town.shops"
                :key="shop.id"
                id="inventoryButton"
                type="button"
                class="a-button action__button"
                @click="enterShop(shop.id)"
            >
                {{ shop.name }}
            </button>
        </div>
        <div class="o-interface__row">
            <button id="inventoryButton" type="button" class="a-button action__button" @click="toggleInventory">
                Inventory
            </button>
            <button class="a-button action__button" @click="toggleCharacterScreen">Character Screen</button>
        </div>
    </div>
</template>
