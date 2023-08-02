<script setup lang="ts">
import { useAttack } from '@/composables/useAttack'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { usePlayer } from '@/composables/usePlayer'
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
const { activeTurnState, updateTurnStateMachine } = useTurn()
const { targetToAttack } = useAttack()
const { player } = usePlayer()
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()
const playerAttack = () => {
    if (targetToAttack.value) {
        player.value.attack(targetToAttack.value)
        updateTurnStateMachine(ETurnState.EnemyAttack)
    }
}
</script>

<template>
    <div class="o-interface">
        <button
            id="attackButtonOne"
            type="button"
            class="action__button"
            @click="playerAttack"
            :disbaled="activeTurnState !== ETurnState.PlayerAttack"
            :disabled="!player.isAlive"
        >
            Attack
        </button>
        <button id="inventoryButton" type="button" class="action__button" @click="toggleInventory">Inventory</button>
        <button :disabled="activeTurnState !== ETurnState.Init" @click="updateTurnStateMachine(ETurnState.Init)">
            start BATTLE
        </button>
        <button class="action__button" @click="toggleCharacterScreen">Character Screen</button>
    </div>
</template>
