<script setup lang="ts">
import { useLoot } from '@/composables/useLoot'
import { AllItemTypes } from '@/interfaces/IItem'
import { useTurnStore } from '@/stores/useTurn'
import { onMounted, ref } from 'vue'
import { lootLists } from '@/assets/data/lootList'
import { Gold } from '@/assets/models/itemsModel'
import { usePlayerStore } from '@/stores/usePlayer'
import { useGameStateStore } from '@/stores/useGameStateManager'

const turnStore = useTurnStore()
const playerStore = usePlayerStore()
const { weightedRandom, generateItem } = useLoot()
const lootList = ref<Array<AllItemTypes | Gold>>([])

const getlootList = () => console.log(turnStore.monsterList)

turnStore.monsterList.map((monster) => {
    const itemId = weightedRandom(lootLists['goblin'])

    const item = generateItem(itemId)
    console.log(item)

    if (!item) {
        return
    }
    lootList.value.push(item as AllItemTypes)
})
const getItem = (item: AllItemTypes | Gold) => {
    console.log(item)

    playerStore.player?.inventory.addItem(item, playerStore.player?.id)

    lootList.value = lootList.value.filter((loot) => loot !== item) // Remove the item from the lootList
}

onMounted(() => {
    getlootList()
})
</script>

<template>
    <div class="o-feed__container">
        <p class="a-text --center">You defeated your enemies</p>
        <p class="a-text --center">and found:</p>
        <div class="lootList" v-for="loot in lootList" :key="loot.id">
            <div class="lootItem">
                <p class="lootItem__name">{{ loot.name }}</p>
                <button class="a-button" @click="getItem(loot)">Add</button>
            </div>
        </div>
    </div>
</template>

<style lang="sass">

.lootItem
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 1rem
</style>
