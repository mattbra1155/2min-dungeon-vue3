<script setup lang="ts">
import { Armor, Weapon } from '@/assets/models/itemsModel'
import { usePlayer } from '@/composables/usePlayer'
import { EItemCategory } from '@/enums/ItemCategory'
import { IArmor } from '@/interfaces/IItem'
import { getTotalDamage } from '@/helpers/getTotalDamage'
import { getTotalArmorPoints } from '@/helpers/getTotalArmorPoints'
import { computed } from 'vue'

const { player } = usePlayer()
const props = defineProps<{
    itemId: string
}>()

const item = computed(() => player.value.inventory.inventory.find((inventoryItem) => inventoryItem.id === props.itemId))
</script>

<template>
    <div v-if="item" class="m-inventoryItem">
        <picture class="m-inventoryItem__imageWrapper">
            <source srcset="https://placehold.co/200x200" media="(max-width: 768px )" />
            <img src="https://placehold.co/200x200" alt="" class="a-image m-inventoryItem__image" />
        </picture>
        <div class="m-inventoryItem__details">
            <h2 class="a-text m-inventoryItem__title m-inventoryItem__detailsItem --fullWidth">{{ item.name }}</h2>
            <p class="a-text m-inventoryItem__detailsItem --fullWidth">Type: {{ item.type }}</p>
            <p class="a-text m-inventoryItem__detailsItem --fullWidth" v-if="item instanceof Armor">
                Slot: {{ item.bodyPart }}
            </p>
            <p class="a-text m-inventoryItem__detailsItem" v-if="item.category === EItemCategory.Weapon">
                Damage: {{ getTotalDamage(item as Weapon) }}
            </p>
            <p class="a-text m-inventoryItem__detailsItem" v-if="item.category === EItemCategory.Armor">
                Armor: {{ getTotalArmorPoints(item as Armor) }}
            </p>
            <p class="a-text m-inventoryItem__detailsItem --fullWidth">{{ item.description }}</p>
        </div>
        <div class="a-text m-inventoryItem__details">
            <h2 class="a-text m-inventoryItem__title m-inventoryItem__detailsItem --fullWidth">Modifiers</h2>
        </div>
    </div>
</template>
