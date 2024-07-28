<script setup lang="ts">
import { computed } from 'vue'
import { skills } from '@/assets/json/skills'
import { Armor, Weapon } from '@/assets/models/itemsModel'
import AIcon from '@/components/AIcon.vue'
import { usePlayer } from '@/composables/usePlayer'
import { EItemCategory } from '@/enums/ItemCategory'
import { getTotalDamage } from '@/helpers/getTotalDamage'
import { getTotalArmorPoints } from '@/helpers/getTotalArmorPoints'
import { getItemIcon } from '@/helpers/getItemIcon'

const props = defineProps<{
    itemId: string
}>()

const { player } = usePlayer()
const item = computed(() => player.value.inventory.inventory.find((inventoryItem) => inventoryItem.id === props.itemId))

const getSkillNames = () =>
    (item.value as Weapon).requiredSkills.map((skill) => skills.find((rrr) => rrr.id === skill)?.name)
</script>

<template>
    <div v-if="item" class="m-inventoryItem">
        <div class="m-inventoryItem__details">
            <AIcon class="--inventoryItem" v-if="item.icon" :icon="getItemIcon(item)" />
            <h2 class="a-text m-inventoryItem__title m-inventoryItem__detailsItem --fullWidth">{{ item.name }}</h2>
            <p class="a-text m-inventoryItem__detailsItem --fullWidth">Type: {{ item.type }}</p>
            <p class="a-text m-inventoryItem__detailsItem --fullWidth" v-if="item instanceof Weapon">
                Rquired skills: <template v-for="skill in getSkillNames()" :key="skill">{{ skill }}, </template>
            </p>
            <p class="a-text m-inventoryItem__detailsItem --fullWidth" v-if="item.category === EItemCategory.Armor">
                Material: {{ (item as Armor).material }}
            </p>
            <p class="a-text m-inventoryItem__detailsItem --fullWidth" v-if="item.category === EItemCategory.Armor">
                Slot:
                {{
                    (item as Armor).bodyPart
                        .toString()
                        .replace(/([A-Z])/g, ' $1')
                        .trim()
                        .toLowerCase()
                }}
            </p>
            <p class="a-text m-inventoryItem__detailsItem" v-if="item.category === EItemCategory.Weapon">
                Damage: {{ getTotalDamage(item as Weapon) }}
            </p>
            <p class="a-text m-inventoryItem__detailsItem" v-if="item.category === EItemCategory.Armor">
                Armor: {{ getTotalArmorPoints(item as Armor) }}
            </p>
            <p class="a-text m-inventoryItem__detailsItem --fullWidth">Encumbrance: {{ item.encumbrance }} pts.</p>
            <p class="a-text m-inventoryItem__detailsItem --fullWidth">{{ item.description }}</p>
        </div>
        <div class="a-text m-inventoryItem__details">
            <h2 class="a-text m-inventoryItem__title m-inventoryItem__detailsItem">Modifiers</h2>
            <p v-for="modifier in item.modifiers" :key="modifier.id" class="a-text">{{ modifier.name }}</p>
        </div>
    </div>
</template>
