<script setup lang="ts">
import { locationCards as locationCardsData } from '@/assets/data/locationCards'
import { EGameState } from '@/enums/EGameState'
import { useGameStateStore } from '@/stores/useGameStateManager'
import { usePlayerStore } from '@/stores/usePlayer'
import { usePlayerPositionStore } from '@/stores/usePlayerPosition'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { onMounted, ref, watch } from 'vue'

interface ICardOption {
    cardId: number
    text: string
    actions?: string[] | undefined
}

interface ILocationCard {
    id: number
    description: string
    options: ICardOption[]
}

interface ILocationMonster {
    id: string
    cardId: number
}

interface ILocationData {
    id: string
    name: string
    description: string
    cards: ILocationCard[]
    monsters: {
        id: string
        cardId: number
    }[]
}

const playerStore = usePlayerStore()
const playerPositionStore = usePlayerPositionStore()
const sceneManager = useSceneManagerStore()
const gameStateStore = useGameStateStore()
const locations = ref<ILocationData[]>(locationCardsData)
const activeLocation = ref<ILocationData>({
    id: '',
    name: '',
    description: '',
    cards: [],
    monsters: [],
})

const activeCard = ref<number>(1)

const setActiveLocation = (locationId: string) => {
    locations.value.find((location) => {
        if (location.id === locationId) {
            activeLocation.value = location
            return true
        }
    })
}
const getCard = (id: number) => {
    const card = activeLocation.value?.cards.find((card) => card.id === id)
    if (!card) {
        return
    }

    activeCard.value = card.id
    return card
}

watch(
    () => activeCard.value,
    (newCardId) => {
        const monsterIdList: string[] = activeLocation.value.monsters
            .filter((monster) => monster.cardId === newCardId)
            .map((monster) => monster.id)
        if (!monsterIdList.length) {
            return
        }
        sceneManager.createEnemyList(monsterIdList)
        gameStateStore.updateGameState(EGameState.Battle)
    }
)
const feed = ref<string[]>([])

onMounted(() => {
    if (!sceneManager.activeRoom) {
        console.error('no active room')
        return
    }
    gameStateStore.updateGameState(EGameState.Story)
    setActiveLocation(sceneManager.activeRoom.id)
})
</script>

<template>
    <div v-show="gameStateStore.activeGameState === EGameState.Story" class="story">
        <h2>{{ activeLocation?.name }}</h2>
        <p>{{ activeLocation?.description }}</p>
        --
        <p class="a-text">{{ getCard(activeCard)?.description }}</p>
        <button
            v-for="option in getCard(activeCard)?.options"
            class="a-button"
            :key="option.text"
            @click="getCard(option.cardId)"
        >
            {{ option.text }}
        </button>
    </div>
</template>

<style lang="sass" scoped>
.story
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: var(--bacgkroundGradientColor)
</style>
