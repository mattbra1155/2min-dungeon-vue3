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
        <button id="inventoryButton" type="button" class="a-button action__button" @click="toggleInventory">
            Inventory
        </button>
        <button
            v-if="activeGameState === EGameState.Battle"
            :disabled="activeTurnState !== ETurnState.Init"
            @click="updateTurnStateMachine(ETurnState.Init)"
        >
            start BATTLE
        </button>
        <button class="a-button action__button" @click="toggleCharacterScreen">Character Screen</button>
    </div>
</template>
