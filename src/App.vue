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
// import { SceneManager } from '@/assets/scripts/sceneManager'
import useGameEngine from '@/composables/useGameEngine'
import { defineComponent, reactive } from 'vue'
import { Player } from '@/interfaces/Player'
import { Weapon } from '@/interfaces/Item'
import { BodyParts } from '@/interfaces/BodyParts'
import usePlayer from '@/composables/usePlayer'
import { PlayerModel } from '@/assets/models/playerModel'
export default defineComponent({
    setup() {
        return {}
    },
})
</script>
