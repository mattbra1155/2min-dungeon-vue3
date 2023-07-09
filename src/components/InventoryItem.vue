<script setup lang="ts">
import { Weapon } from '@/assets/models/itemsModel'
import { usePlayer } from '@/composables/usePlayer'
import { EItemCategory } from '@/enums/ItemCategory'
import { IArmor, IWeapon } from '@/interfaces/IItem'
import { getTotalDamage } from '@/helpers/getTotalDamage'
import { computed } from 'vue'

const { player } = usePlayer()
const props = defineProps<{
    itemId: number
}>()

const item = computed(() => player.value.inventory.inventory.find((inventoryItem) => inventoryItem.id === props.itemId))
console.log(player.value)
const getDamage = computed(() => {
    console.log(item.value instanceof Weapon)

    if (item.value?.category === EItemCategory.Weapon) {
        return (item.value as Weapon).damage
    } else {
        return undefined
    }
})

const getArmorPoints = computed(() => {
    if (item.value?.category === EItemCategory.Armor) {
        return (item.value as IArmor).armorPoints
    } else {
        return undefined
    }
})
</script>

<template>
    <div v-if="item" class="m-inventoryItem">
        <picture class="m-inventory__imageWrapper">
            <source srcset="https://placehold.co/200x200" media="(max-width: 768px )" />
            <img src="https://placehold.co/200x200" alt="" class="a-image m-inventoryItem__image" />
        </picture>
        <div class="m-inventoryItem__details">
            <h2 class="a-text m-inventoryItem__title m-inventoryItem__detailsItem --fullWidth">{{ item.name }}</h2>

            <!-- <p class="a-text m-inventoryItem__detailsItem">{{ item.category }}</p> -->
            <p class="a-text m-inventoryItem__detailsItem --fullWidth">Type: {{ item.type }}</p>
            <p class="a-text m-inventoryItem__detailsItem" v-if="item.category === EItemCategory.Weapon">
                Damage: <i v-if="item.prefix.modifier > 0">+</i>{{ getTotalDamage(item as IWeapon) }}
            </p>
            <p class="a-text m-inventoryItem__detailsItem" v-if="item.category === EItemCategory.Armor">
                {{ getArmorPoints }}
            </p>

            <p class="a-text m-inventoryItem__detailsItem --fullWidth">{{ item.description }}</p>
        </div>
        <div class="a-text m-inventoryItem__details">
            <h2 class="a-text m-inventoryItem__title m-inventoryItem__detailsItem --fullWidth">Modifiers</h2>
            <p class="a-text -text m-inventoryItem__detailsItem">Base damage:</p>
            <p class="a-text -text m-inventoryItem__detailsItem">
                damage <i v-if="item.prefix.modifier > 0">+</i>{{ getDamage }}
            </p>
            <p class="a-text -text m-inventoryItem__detailsItem">{{ item.prefix.name }}:</p>
            <p class="a-text -text m-inventoryItem__detailsItem">
                damage <i v-if="item.prefix.modifier > 0">+</i>{{ item.prefix.modifier }}
            </p>
        </div>
    </div>
</template>
