<script setup lang="ts">
import { useAttack } from '@/composables/useAttack'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { player } from '@/assets/models/playerManager'
const { turnModel } = useTurn()
const { targetToAttack } = useAttack()
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()
console.log(turnModel.value)

const playerAttack = () => {
    if (targetToAttack.value) {
        console.log(targetToAttack.value)
        console.log(turnModel.value)

        player.attack(targetToAttack.value)
        turnModel.value.checkIfDead()
        turnModel.value.updateTurnStateMachine(ETurnState.EnemyAttack)
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
