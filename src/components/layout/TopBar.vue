<template>
    <div id="top-bar">
        <h2 id="levelName" class="level__name">{{ scene.name }}</h2>
        <h3 id="turnNumber" class="text--center"></h3>
        <div class="health__display">
            <div class="player-hp">
                <h2>{{ player?.name }}</h2>
                <p id="playerHp" class="health--player">{{ player?.stats ? player.stats.hp : 0 }}</p>
            </div>
            <div v-for="enemy in enemyList" class="monster-hp" :key="enemy.name">
                <h2 @click="setTargetToAttack(enemy)" id="monsterName">
                    {{ enemy.name ? enemy.name : 'placeholder enemy' }}
                </h2>
                <p id="monsterHp" class="health--monster">{{ enemy.stats ? enemy.stats.hp : 0 }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { usePlayer } from '@/composables/usePlayer'
import { useSceneManager } from '@/composables/useSceneManager'
import { computed, defineComponent } from 'vue'
export default defineComponent({
    name: 'TopBar',
    setup() {
        const { player, setTargetToAttack } = usePlayer()
        const { scene } = useSceneManager()

        const enemyList = computed(() => scene.value.enemy)

        return {
            player,
            enemyList,
            scene,
            setTargetToAttack,
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
