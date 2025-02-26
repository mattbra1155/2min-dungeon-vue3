<script setup lang="ts">
import { useAttack } from '@/composables/useAttack'
import { ETurnState } from '@/enums/ETurnState'
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { onMounted } from 'vue'
import { EGameState } from '@/enums/EGameState'
import AIcon from '@/components/AIcon.vue'
import KnapsackIcon from '../icons/KnapsackIcon.vue'
import CharacterScreenIcon from '../icons/CharacterScreenIcon.vue'
import { useGlobalStore } from '@/stores/useGlobal'
import { useGameStateStore } from '@/stores/useGameStateManager'
import { usePlayerStore } from '@/stores/usePlayer'
import { useTurnStore } from '@/stores/useTurn'

const globalStore = useGlobalStore()
const gameStateStore = useGameStateStore()
const turnStore = useTurnStore()
const { targetToAttack } = useAttack()
const playerStore = usePlayerStore()
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()

const playerAttack = () => {
    if (!playerStore.player) {
        return
    }
    if (targetToAttack.value && !globalStore.isAttacking) {
        playerStore.player.attack(targetToAttack.value)
        turnStore.checkIfDead()
        turnStore.updateTurnStateMachine(ETurnState.EnemyAttack)
    }
}
const addKeybindings = () => {
    window.addEventListener('keyup', (event) => {
        if (event.key === 'i') {
            toggleInventory()
            return
        }
        if (event.key === 'c') {
            toggleCharacterScreen()
            return
        }
        if (gameStateStore.activeGameState === EGameState.Battle && event.code === 'Space') {
            playerAttack()
            return
        }
    })
}

onMounted(() => {
    addKeybindings()
})
</script>

<template>
    <div class="o-interface">
        <div v-if="playerStore.player" class="o-header__healthItem --player">
            <h2 class="o-header__name">{{ playerStore.player.name }}</h2>
            <meter
                class="o-header__meter"
                min="0"
                :max="playerStore.player.stats.hp"
                low="30"
                :value="playerStore.player.currentStats.hp"
            >
                {{ playerStore.player.currentStats.hp ? playerStore.player.currentStats.hp : 0 }}
            </meter>
            <p id="playerHp"></p>
        </div>
        <button
            id="attackButtonOne"
            type="button"
            class="a-button action__button"
            :class="{ '--disabled': globalStore.isAttacking }"
            @click="playerAttack"
            :disbaled="
                turnStore.activeTurnState !== ETurnState.PlayerAttack ||
                globalStore.isAttacking ||
                !playerStore.player?.isAlive
            "
        >
            Attack
        </button>
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
