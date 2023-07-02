<script setup lang="ts">
import { usePlayer } from '@/composables/usePlayer'
import { useInventory } from '@/composables/useInventory'
import { useRouter } from 'vue-router'
const { player } = usePlayer()
const { isOpen, toggleInventory } = useInventory()

const router = useRouter()
router.beforeEach(() => {
    toggleInventory()
})
</script>

<template>
    <div v-if="isOpen" id="inventory" class="inventory">
        <h2>Inventory</h2>
        <button id="inventoryCloseButton" class="close" @click="toggleInventory">Close Inventory</button>
        <ul id="inventoryList" class="inventory__list">
            <li v-for="item in player?.inventory" :key="item.id">tt{{ item.name }}</li>
            end
        </ul>
    </div>
</template>

<style lang="sass">

.inventory
    display: flex
    flex-flow: row wrap
    width: 30%
    height: 100vh
    position: absolute
    top: 0
    left: 0
    background: #ededed
    z-index: 100
    &__list
        display: flex
        flex-direction: column
        justify-content: flex-start
        align-items: center
        width: 100%
        height: 100%
        padding: 5%
    &__item
        display: flex
        flex-direction: row
        justify-content: space-between
        width: 100%
</style>
