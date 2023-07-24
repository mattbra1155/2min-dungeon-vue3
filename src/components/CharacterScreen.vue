<script setup lang="ts">
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { usePlayer } from '@/composables/usePlayer'
const { isOpen, toggleCharacterScreen } = useCharacterScreen()
const { player } = usePlayer()
</script>

<template>
    <div v-if="isOpen" class="o-characterScreen">
        <div class="o-characterScreen__header">
            <h1 class="a-text">Character screen</h1>
            <button class="a-button --secondary" @click="toggleCharacterScreen">Close</button>
        </div>
        <picture class="o-characterScreen__imageWrapper">
            <source srcset="https://placehold.co/200x200" media="(max-width: 768px )" />
            <img src="https://placehold.co/200x200" alt="" class="a-image m-inventoryItem__image" />
        </picture>
        <div class="o-characterScreen__detailsWrapper">
            <h2 class="a-text">{{ player.name }}</h2>
            <p class="a-text">Profession: {{ player.profession }}</p>
            <p class="a-text">Race: {{ player.race }}</p>
            <p class="a-text">Bio:</p>
            <p class="a-text">{{ player.description }}</p>
        </div>
        <div class="o-characterScreen__statsWrapper">
            <h2 class="a-text">Stats:</h2>
            <div class="o-characterScreen__statList">
                <div class="o-characterScreen__statItem" v-for="(value, key) in player.stats" :key="key">
                    <p class="a-text">{{ key }}</p>
                    <p class="a-text">{{ value }}</p>
                </div>
            </div>
        </div>
        <div class="o-characterScreen__modifiersWrapper">
            <h2 class="a-text">Modifiers</h2>
            <p v-for="modifierItem in player.modifiers" :key="modifierItem.id">
                {{ modifierItem.name }} {{ modifierItem.type }}
                <template v-for="(value, key) in modifierItem.modifiers"> {{ key }}: {{ value }}</template>
            </p>
        </div>
    </div>
</template>
