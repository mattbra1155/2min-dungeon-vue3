<script setup lang="ts">
import { useAttack } from '@/composables/useAttack'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { usePlayer } from '@/composables/usePlayer'
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { onMounted } from 'vue'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'
import AIcon from '@/components/AIcon.vue'
import KnapsackIcon from '../icons/KnapsackIcon.vue'
import CharacterScreenIcon from '../icons/CharacterScreenIcon.vue'

const { activeGameState } = useGameStateManager()
const { activeTurnState, checkIfDead, updateTurnStateMachine } = useTurn()
const { targetToAttack } = useAttack()
const { player } = usePlayer()
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()

const playerAttack = () => {
    if (targetToAttack.value) {
        player.value.attack(targetToAttack.value)
        checkIfDead()
        updateTurnStateMachine(ETurnState.EnemyAttack)
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
        if (activeGameState.value === EGameState.Battle && event.code === 'Space') {
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
        <div class="o-header__healthItem --player">
            <h2 class="o-header__name">{{ player?.name }}</h2>
            <meter class="o-header__meter" min="0" :max="player.stats.hp" low="30" :value="player.currentStats.hp">
                {{ player.currentStats.hp ? player.currentStats.hp : 0 }}
            </meter>
            <p id="playerHp"></p>
        </div>
        <button
            id="attackButtonOne"
            type="button"
            class="a-button action__button"
            @click="playerAttack"
            :disbaled="activeTurnState !== ETurnState.PlayerAttack"
            :disabled="!player.isAlive"
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
