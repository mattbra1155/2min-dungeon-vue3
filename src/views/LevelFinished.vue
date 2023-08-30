<script setup lang="ts">
import { PlayerModel } from '@/assets/models/playerModel'
import { diceRollK4 } from '@/assets/scripts/diceRoll'
import { useLoot } from '@/composables/useLoot'
import { usePlayer } from '@/composables/usePlayer'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AllItemTypes } from '@/interfaces/IItem'

const { updateTurnStateMachine } = useTurn()
updateTurnStateMachine(ETurnState.Init)
const router = useRouter()
const { player } = usePlayer()
const { generateLoot } = useLoot()

console.log(player.value)
const lootList = ref<AllItemTypes[]>([])

const rollLoot = () => {
    const lootAmount = diceRollK4()
    for (let x = 0; x < lootAmount; x++) {
        const loot = generateLoot(1)
        if (loot) {
            lootList.value.push(loot)
        }
    }
}

const takeItem = (lootItem: AllItemTypes) => {
    player.value.inventory.addItem(lootItem, player.value.id)
}
</script>

<template>
    <div class="m-main o-levelFinished">
        <div class="o-levelFinished__textContainer">
            <h1 class="o-levelFinished__title">LEVEL CLEARED</h1>
            <template v-if="!lootList.length">
                <p>search for loot</p>
                <button @click="rollLoot()">Search</button>
            </template>
            <template v-else>
                <p class="o-levelFinished__text">you found</p>
                <div v-for="lootItem in lootList" :key="lootItem.id" class="m-lootCard">
                    <p>name: {{ lootItem.name }}</p>
                    <p>type: {{ lootItem.type }}</p>
                    <button @click="takeItem(lootItem)">take</button>
                </div>
            </template>
            <button @click="router.push({ name: 'home', state: { nextLevel: true } })" class="a-button">
                Next level
            </button>
        </div>
    </div>
</template>
