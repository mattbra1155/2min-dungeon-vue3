<script setup lang="ts">
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { computed, onMounted, toRefs } from 'vue'
import { Scene } from '@/assets/models/sceneModel'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import localtions from '@/assets/json/locations.json'
import router from '@/router'
import { useShop } from '@/composables/useShop'
import { EGameState } from '@/enums/EGameState'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { Town } from '@/assets/models/sceneTownModel'

const { activeRoom, setMapLocation, sceneList } = useSceneManagerStore()
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()
const { setActiveShop } = useShop()
const { activeGameState } = useGameStateManager()

const props = defineProps<{
    town: Town
}>()

const { town } = toRefs(props)
const lastScene = computed(() => sceneList.value.findLast((el) => el))

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

const moveToScene = (sceneId: string) => {
    const isAlreadyExplored = sceneList.value.find((scene) => scene.id === sceneId)

    let sceneData: unknown = {}
    if (isAlreadyExplored) {
        sceneData = sceneList.value.find((scene) => scene.id === sceneId)
    } else {
        sceneData = localtions.find((scene) => scene.id === sceneId)
    }

    if (!activeRoom.value) {
        console.error('no active Scene')
        return
    }
    if (!sceneData) {
        console.error('no Scene found')
        return
    }

    if (activeRoom.value.id !== 'town' && sceneId === 'town') {
        router.push({ name: 'town' })
        return
    }

    activeGameState.value = EGameState.Travel
    town.value.activeShopId = undefined
    router.push({ name: 'home' })

    const scene = Object.assign(new Location(), sceneData)

    setMapLocation(scene)
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
    <div v-if="activeRoom" class="o-interface --town">
        <button class="a-button action__button" v-if="lastScene" @click="moveToScene(lastScene.id)">Leave Town</button>
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
