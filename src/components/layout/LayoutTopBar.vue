<template>
    <div id="top-bar">
        <h2 v-if="scene" id="levelName" class="level__name">{{ scene.name }}</h2>
        <p style="text-align: center">{{ activeTurnState }}</p>
        <p style="text-align: center">Turn: {{ turn }}</p>
        <h3 id="turnNumber" class="text--center"></h3>
        <div class="health__display">
            <div class="player-hp">
                <h2>{{ player?.name }}</h2>
                <p id="playerHp" class="health--player">{{ player.stats.hp ? player.stats.hp : 0 }}</p>
            </div>
            <div
                v-for="enemy in enemyList"
                class="monster-hp"
                :class="{ 'monster-hp--active': targetToAttack === enemy }"
                :key="enemy.id"
            >
                <h2 @click="setTargetToAttack(enemy)" id="monsterName">
                    {{ enemy.name ? enemy.name : 'placeholder enemy' }}
                </h2>
                <p id="monsterHp" class="health--monster">{{ enemy.stats.hp ? enemy.stats.hp : 0 }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useAttack } from '@/composables/useAttack'
import { usePlayer } from '@/composables/usePlayer'
import { useSceneManager } from '@/composables/useSceneManager'
import { useTurn } from '@/composables/useTurn'
import { computed, defineComponent } from 'vue'
export default defineComponent({
    name: 'TopBar',
    setup() {
        const { targetToAttack, setTargetToAttack } = useAttack()
        const { player } = usePlayer()
        const { scene } = useSceneManager()
        const { activeTurnState, turn } = useTurn()

        const enemyList = computed(() => (scene.value ? scene.value.enemy : null))

        return {
            turn,
            player,
            enemyList,
            scene,
            setTargetToAttack,
            targetToAttack,
            activeTurnState,
        }
    },
})
</script>
