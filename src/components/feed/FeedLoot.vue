<script setup lang="ts">
import { useLoot } from '@/composables/useLoot'
import { AllItemTypes } from '@/interfaces/IItem'
import { useTurnStore } from '@/stores/useTurn'
import { onMounted, ref } from 'vue'
import { lootLists } from '@/assets/data/lootList'
import { Gold } from '@/assets/models/itemsModel'

const turnStore = useTurnStore()
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
    lootList.value.push(item)
})
// const getItem = (container: IContainer, item: AllItemTypes) => {
//     console.log(container, item)

//     playerStore.player?.inventory.addItem(item, playerStore.player?.id)
//     console.log(playerStore.player?.inventory.inventory)

//     const itemToRemoveIndex = container.items.findIndex((findItem) => findItem.id === item.id)
//     container.items.splice(itemToRemoveIndex, 1)
//     if (!container.items.length) {
//         feedStore.setTravelFeedItem(`You took everything from ${container.name}`)
//     }
// }

// const close = () => {
//     feedStore.setActiveRoomObject(undefined)
//     globalStore.isMoving = false
//     updateGameState(EGameState.Travel)
// }
onMounted(() => {
    getlootList()
})
</script>

<template>
    <div class="o-feed__loot">
        {{ lootList }}
        <div class="lootList" v-for="loot in lootList" :key="loot.id">
            <div class="lootItem">
                <h2 class="lootItem__name">{{ loot.name }}</h2>
            </div>
        </div>
    </div>
</template>

<style lang="sass"></style>
