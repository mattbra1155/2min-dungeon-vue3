<script setup lang="ts">
import { sceneManager } from '@/assets/models/SceneManager'
import { useAttack } from '@/composables/useAttack'
import { useTurn } from '@/composables/useTurn'
import { computed, onMounted, ref } from 'vue'

const { targetToAttack, setTargetToAttack } = useAttack()
const { turnModel } = useTurn()
// import { player } from '@/assets/models/playerManager'
import localforage from 'localforage'
import { PlayerModel } from '@/assets/models/playerModel'
import { playerManager } from '@/assets/models/playerManager'

const player = ref<PlayerModel>()
onMounted(async () => {
    player.value = playerManager.player
    console.log(player.value)
})
</script>

<template>
    <div id="top-bar">
        <h2 v-if="sceneManager.scene" id="levelName" class="level__name">{{ sceneManager.scene.name }}</h2>
        <p style="text-align: center">{{ turnModel.activeTurnState }}</p>
        <p style="text-align: center">Turn: {{ turnModel.turn }}</p>
        <h3 id="turnNumber" class="text--center"></h3>
        <div class="health__display">
            <div v-if="player" class="player-hp">
                <h2>{{ player?.name }}</h2>
                <p id="playerHp" class="health--player">{{ player.currentStats.hp ? player.currentStats.hp : 0 }}</p>
            </div>
            <template v-for="enemy in sceneManager.scene?.enemyList">
                <div
                    v-if="enemy"
                    class="monster-hp"
                    :class="{ 'monster-hp--active': targetToAttack === enemy.id }"
                    :key="enemy.id"
                >
                    <h2 @click="setTargetToAttack(enemy?.id)" id="monsterName">
                        {{ enemy.name ? enemy.name : 'placeholder enemy' }}
                    </h2>
                    <p id="monsterHp" class="health--monster">
                        {{ enemy.currentStats.hp ? enemy.currentStats.hp : 0 }}
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>
