<script setup lang="ts">
import { Armor, Potion, Weapon } from '@/assets/models/itemsModel'
import { useLoot } from '@/composables/useLoot'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { updateTurnStateMachine } = useTurn()
updateTurnStateMachine(ETurnState.Init)
const router = useRouter()

const { generateLoot } = useLoot()

const loot = ref<Weapon | Armor | Potion | string | undefined>(generateLoot(1))
</script>

<template>
    <div class="m-main o-levelFinished">
        <div class="o-levelFinished__textContainer">
            <h1 class="o-levelFinished__title">LEVEL CLEARED</h1>
            <p class="o-levelFinished__text">
                you found<br />
                {{ loot }}
            </p>
            <button @click="router.push({ name: 'home', state: { nextLevel: true } })" class="a-button">
                Next level
            </button>
        </div>
    </div>
</template>
