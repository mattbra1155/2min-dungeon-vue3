<script setup lang="ts">
import { useLoot } from '@/composables/useLoot'
import { usePlayer } from '@/composables/usePlayer'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { useRouter } from 'vue-router'
import { AllItemTypes } from '@/interfaces/IItem'
import { Gold } from '@/assets/models/itemsModel'

const { updateTurnStateMachine } = useTurn()
updateTurnStateMachine(ETurnState.Init)
const router = useRouter()
const { player } = usePlayer()
const { lootList, generateLoot } = useLoot()

const takeItem = (lootItem: AllItemTypes | Gold) => {
    player.value.inventory.addItem(lootItem, player.value.id)
    const indexOfItem = lootList.value.findIndex((item) => item.id === lootItem.id)
    lootList.value.splice(indexOfItem, 1)
}

const nextLevel = () => {
    lootList.value = []
    router.push({ name: 'home', state: { nextLevel: true } })
}
</script>

<template>
    <div class="m-main o-levelFinished">
        <div class="o-levelFinished__textContainer">
            <h1 class="o-levelFinished__title">LEVEL CLEARED</h1>
            <template v-if="!lootList.length">
                <p>search for loot</p>
                <button @click="generateLoot()">Search</button>
            </template>
            <template v-else>
                <p class="o-levelFinished__text">you found</p>
                <div v-for="lootItem in lootList" :key="lootItem.id" class="m-lootCard">
                    <p>name: {{ lootItem.name }}</p>
                    <p>type: {{ lootItem.type }}</p>
                    <button @click="takeItem(lootItem)">take</button>
                </div>
            </template>
            <button @click="nextLevel" class="a-button">Next level</button>
        </div>
    </div>
</template>
