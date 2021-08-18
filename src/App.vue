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
import { SceneManager } from '@/assets/scripts/sceneManager'
import useGameEngine from '@/composables/useGameEngine'
import { defineComponent } from 'vue'
export default defineComponent({
    computed: {},
    methods: {},
    created() {
        console.log('create')

        console.log(this.$store.getters['player/getPlayer'])
    },
    mounted() {
        const gameEngine = new useGameEngine()
        gameEngine.init()

        const sceneManager = new SceneManager()
        this.$store.dispatch('player/fetchPlayer').then(() => {
            sceneManager.createScene()
        })
    },
})
</script>
