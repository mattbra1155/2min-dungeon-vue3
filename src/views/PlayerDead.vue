<template>
    <div class="m-main o-playerDead">
        <div class="o-playerDead__textContainer">
            <h1 class="o-playerDead__title">YOU DIED</h1>
            <p class="o-playerDead__text"> you were killed by:<br />
                {{ activeCharacter.name }} with a {{ activeCharacter.weapon?.name }}</p>
            <button @click="router.push({ name: 'home' })" class="a-button">Try again</button>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { useTurn } from "@/composables/useTurn";
import { useRouter } from "vue-router";
export default defineComponent({
    setup() {
        const router = useRouter()
        const { activeCharacter } = useTurn()
        return {
            router,
            activeCharacter
        }
    }
})
</script>