<script setup lang="ts">
import { usePlayer } from '@/composables/usePlayer'
import { EItemCategory } from '@/enums/ItemCategory'
import { computed } from 'vue'

const { player } = usePlayer()
const props = defineProps<{
    itemId: number
}>()

const item = computed(() => player.value.inventory.find((inventoryItem) => inventoryItem.id === props.itemId))
const getItemCategory = (...args: [IArmor: any] | [IWeapon: any] | [IPotion: any]) => {
    console.log(args)
    if (item.value?.category === EItemCategory.Weapon) {
        return item.value
    }
}

console.log(item)
</script>

<template>
    <div v-if="item" class="m-inventoryItem">
        <h3 class="m-inventoryItem__title">{{ item.name }}</h3>
        <p class="a-text">{{ item.category }}</p>
        <p class="a-text">{{ item.description }}</p>
        <p class="a-text">{{ item.type }}</p>
        <p class="a-text" v-if="getItemCategory(item)">{{ item }}</p>
        <p class="a-text"></p>
    </div>
</template>
