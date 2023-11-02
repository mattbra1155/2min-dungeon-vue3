<script setup lang="ts">
import { useAttack } from '@/composables/useAttack'
import { usePlayer } from '@/composables/usePlayer'
// import { sceneManager } from '@/assets/models/sceneManager'

import { useTurn } from '@/composables/useTurn'
import { computed, onMounted, ref } from 'vue'
import { Scene } from '@/assets/models/sceneModel'
import { useSceneManager } from '@/composables/useSceneManager'

const { targetToAttack, setTargetToAttack } = useAttack()
const { player } = usePlayer()
const { activeScene } = useSceneManager()
const { turnModel } = useTurn()

const enemyList = computed(() => (activeScene.value ? activeScene.value.entityList : null))
</script>

<template>
    <div id="top-bar">
        <h2 v-if="activeScene" id="levelName" class="level__name">{{ activeScene.name }}</h2>
        <p style="text-align: center">Room: {{ activeScene?.currentRoom?.name }}</p>
        <p style="text-align: center">{{ turnModel.activeTurnState }}</p>
        <p style="text-align: center">Turn: {{ turnModel.turn }}</p>
        <h3 id="turnNumber" class="text--center"></h3>
        <div class="health__display">
            <div class="player-hp">
                <h2>{{ player?.name }}</h2>
                <p id="playerHp" class="health--player">{{ player.currentStats.hp ? player.currentStats.hp : 0 }}</p>
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
                <p id="monsterHp" class="health--monster">{{ enemy.currentStats.hp ? enemy.currentStats.hp : 0 }}</p>
            </div>
        </div>
    </div>
</template>
