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
import { iPlayer } from '@/interfaces/Player'
import { iWeapon } from '@/interfaces/Item'
import { iBodyParts } from '@/interfaces/BodyParts'
import usePlayer from '@/composables/usePlayer'
import { PlayerModel } from '@/assets/models/playerModel'
import { PersonModel } from './assets/models/personModel'
import { MonsterModel } from '@/assets/models/monsterModel'
import { MonsterGenerator } from './assets/generators/monsterGenerator'
import { ItemGenerator } from './assets/generators/itemGenerator'
export default defineComponent({
    setup() {
        const player = new ItemGenerator()
        console.log(player.createItemBase('weapon'))

        return {}
    },
})
</script>
