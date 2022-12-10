<template>
    <div class="m-main o-playerDead">
        <div class="o-playerDead__textContainer">
            <h1 class="o-playerDead__title">YOU DIED</h1>
            <p class="o-playerDead__text"> you were killed by:<br />
                {{ activeCharacter.name }} with a {{ activeCharacter.weapon?.name }}</p>
            <button @click="router.push({ name: 'characterCreation' })" class="a-button">Try again</button>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, onMounted } from "vue";
import { useTurn } from "@/composables/useTurn";
import { useRouter } from "vue-router";
import { usePlayer } from "@/composables/usePlayer";
import { useSceneManager } from "@/composables/useSceneManager";
export default defineComponent({

    setup() {
        const { deadPlayer } = usePlayer()
        const router = useRouter()
        const { activeCharacter } = useTurn()
        const { createScene } = useSceneManager()
        onMounted(() => {
            deadPlayer()   
            createScene()      
               
        })
        return {
            router,
            activeCharacter
        }
    }
})
</script>