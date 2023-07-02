<script setup lang="ts">
import { IArmor, IPotion, IWeapon } from '@/interfaces/IItem'

const props = defineProps<{
    item: IWeapon | IArmor | IPotion
}>()
</script>

<template>
    <div class="m-inventoryItem">
        <h3 class="m-inventoryItem__title">{{ props.item.name }}</h3>
    </div>
</template>
