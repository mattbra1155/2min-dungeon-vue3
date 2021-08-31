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
import { iPlayer } from '@/interfaces/iPlayer'
import { iWeapon } from '@/interfaces/iItem'
import { iBodyParts } from '@/interfaces/iBodyParts'
import usePlayer from '@/composables/usePlayer'
import { PlayerModel } from '@/assets/models/playerModel'
export default defineComponent({
    setup() {
        return {}
    },
})
</script>
