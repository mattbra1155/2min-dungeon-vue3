<template>
    <div id="top-bar">
        <h2 id="levelName" class="level__name"></h2>
        <h3 id="turnNumber" class="text--center"></h3>
        <div class="health__display">
            <div class="player-hp">
                <h2>{{ player.name }}</h2>
                <p id="playerHp" class="health--player">
                    {{ player.stats ? player.stats.hp : 0 }}
                </p>
            </div>
            <div class="monster-hp">
                <h2 id="monsterName">{{ enemy.name }}</h2>
                <p id="monsterHp" class="health--monster">
                    {{ enemy.stats ? enemy.stats.hp : 0 }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import useEnemy from '@/composables/useEnemy'
import usePlayer from '@/composables/usePlayer'
import { defineComponent, computed } from 'vue'
export default defineComponent({
    name: 'TopBar',
    setup() {
        const { getPlayer } = usePlayer()
        const { getEnemy } = useEnemy()

        const player = computed(() => getPlayer)
        const enemy = () => computed(() => getEnemy)
        // const turn = () => computed(() => getScene)
        // const scene = () => computed(() => getScene)
        return {
            player,
            enemy,
        }
    },
})
</script>

<style lang="sass">
.level__name
    text-align: center
.health__display
    display: flex
    justify-content: space-evenly
    text-align: center
.player-hp
    color: blue
.monster-hp
    color: red
</style>
