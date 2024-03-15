<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePlayer } from '@/composables/usePlayer'
import { useInventory } from '@/composables/useInventory'
import { EItemCategory } from '@/enums/ItemCategory'
import { getTotalDamage } from '@/helpers/getTotalDamage'
import { getTotalArmorPoints } from '@/helpers/getTotalArmorPoints'
import { Armor, Potion, Weapon } from '@/assets/models/itemsModel'
import { AllItemTypes } from '@/interfaces/IItem'
import InventoryItem from './InventoryItem.vue'

const { player } = usePlayer()
const { activeItemId, isOpen, toggleInventory, setactiveItemId, notifications } = useInventory()

const encumbranceMax = computed(() => player.value.inventory.encumbrance.max)
const encumbranceCurrent = computed(() => player.value.inventory.encumbrance.current)
const getButtonType = (item: AllItemTypes) => {
    if (item.category === EItemCategory.Weapon) {
        return 'Wield'
    } else if (item.category === EItemCategory.Armor) {
        return 'Equip'
    } else if (item.category === EItemCategory.Potion) {
        return 'Quaf'
    } else {
        return 'Use'
    }
}

const getItemValue = (item: AllItemTypes) => {
    const value = ref<string | number>()
    switch (item.category) {
        case EItemCategory.Weapon:
            if (getTotalDamage(item as Weapon) > 0) {
                value.value = `+${getTotalDamage(item as Weapon)}`
            } else if (getTotalDamage(item as Weapon) < 0) {
                value.value = getTotalDamage(item as Weapon)
            } else {
                value.value = ''
            }
            break
        case EItemCategory.Armor:
            if (getTotalArmorPoints(item as Armor) > 0) {
                value.value = `+${getTotalArmorPoints(item as Armor)}`
            } else if (getTotalArmorPoints(item as Armor) < 0) {
                value.value = getTotalArmorPoints(item as Armor)
            } else {
                value.value = ''
            }
            break
        case EItemCategory.Potion:
            break
    }
    return value.value
}

const submitAction = (item: AllItemTypes) => {
    if (item instanceof Weapon) {
        item.wield(player.value)
    } else if (item instanceof Armor) {
        item.equip(player.value)
    } else if (item instanceof Potion) {
        item.quaff(player.value)
    }
}

const closeItemDetails = () => {
    activeItemId.value = null
}

const unequip = (item: AllItemTypes) => {
    if (item instanceof Weapon || item instanceof Armor) {
        item.unequip(player.value)
    }
}
</script>

<template>
    <div v-if="isOpen" id="inventory" class="o-inventory">
        <div class="o-inventory__header">
            <h2 class="o-inventory__title">Inventory</h2>
            <button v-if="activeItemId" class="a-button --secondary o-inventory__close" @click="closeItemDetails">
                Back
            </button>
            <button
                v-else
                id="inventoryCloseButton"
                class="a-button --secondary o-inventory__close"
                @click="toggleInventory"
            >
                Close
            </button>
        </div>
        <div class="o-inventory__content">
            <div class="o-inventory__goldWrapper">
                <p>Gold: {{ player.inventory.gold }}</p>
                <p>Encumbrance: {{ encumbranceCurrent }}/{{ encumbranceMax }}</p>
            </div>
            ---
            <hr />
            ---
            <template v-if="!activeItemId">
                <h3 class="a-text">Equipped</h3>
                <ul class="o-inventory__list --noScroll">
                    <template v-for="item in player?.inventory.inventory" :key="item.id">
                        <li v-if="item && item.id && item.isEquipped" class="o-inventory__item --equipped">
                            <template v-if="item instanceof Armor">
                                <div>
                                    <p v-for="bodyPart in item.bodyPart" :key="bodyPart" class="a-text">
                                        {{
                                            bodyPart
                                                .toString()
                                                .replace(/([A-Z])/g, ' $1')
                                                .trim()
                                                .toLowerCase()
                                        }}
                                    </p>
                                </div>
                            </template>
                            <p class="a-text" v-if="item instanceof Weapon">weapon</p>
                            <p @click="setactiveItemId(item.id)">
                                {{ item.name }}
                                {{ getItemValue(item) }}
                            </p>
                            <button class="a-button o-inventory__actionButton" @click="unequip(item)">unequip</button>
                            <div class="o-inventory__details">
                                modifiers:
                                {{ getItemValue(item) }}
                            </div>
                        </li>
                    </template>
                </ul>
                ---
                <hr />
                ---
            </template>

            <InventoryItem v-if="activeItemId" :item-id="activeItemId" />
            <ul v-else id="inventoryList" class="o-inventory__list">
                <p v-for="(notification, index) in notifications" :key="index">{{ notification }}</p>
                <template v-for="item in player?.inventory.inventory" :key="item.id">
                    <li v-if="item && item.id && !item.isEquipped" class="o-inventory__item">
                        <p @click="setactiveItemId(item.id)">
                            {{ item.name }}
                            {{ getItemValue(item) }}
                        </p>
                        <button class="a-button" @click="submitAction(item)">
                            {{ getButtonType(item) }}
                        </button>
                        <div class="o-inventory__details">
                            modifiers:
                            {{ getItemValue(item) }}
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
