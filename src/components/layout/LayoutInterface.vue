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
const { turnModel } = useTurn()
const { targetToAttack } = useAttack()
const { player } = usePlayer()
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()

const playerAttack = () => {
    if (targetToAttack.value) {
        player.value.attack(targetToAttack.value)
        turnModel.value.checkIfDead()
        turnModel.value.updateTurnStateMachine(ETurnState.EnemyAttack)
    }
}
const addKeybindings = () => {
    window.addEventListener('keydown', (event) => {
        console.log(event.code)

        if (event.key === 'i') {
            toggleInventory()
        }
        if (event.key === 'c') {
            toggleCharacterScreen()
        }
        if (activeGameState.value === EGameState.Battle && event.code === 'Space') {
            playerAttack()
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
            class="action__button"
            @click="playerAttack"
            :disbaled="turnModel.activeTurnState !== ETurnState.PlayerAttack"
            :disabled="!player.isAlive"
        >
            Attack
        </button>
        <button id="inventoryButton" type="button" class="action__button" @click="toggleInventory">Inventory</button>
        <button
            :disabled="turnModel.activeTurnState !== ETurnState.Init"
            @click="turnModel.updateTurnStateMachine(ETurnState.Init)"
        >
            start BATTLE
        </button>
        <button class="action__button" @click="toggleCharacterScreen">Character Screen</button>
    </div>
</template>
