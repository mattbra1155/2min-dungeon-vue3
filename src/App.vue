<template>
    <div id="app">
        <nav class="nav">
            <router-link to="/">Main</router-link>
            <router-link to="/character-creation/">Create</router-link>
        </nav>
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ItemGenerator } from './assets/generators/itemGenerator'
import { useSceneManager } from '@/composables/useSceneManager'
export default defineComponent({
    setup() {
        const { createScene } = useSceneManager()

        createScene('level 1', 3)

        return {}
    },
})
</script>
