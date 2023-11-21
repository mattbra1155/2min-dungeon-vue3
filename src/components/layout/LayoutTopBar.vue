<script setup lang="ts">
import { useAttack } from '@/composables/useAttack'
import { usePlayer } from '@/composables/usePlayer'
import { useTurn } from '@/composables/useTurn'
import { useSceneManager } from '@/composables/useSceneManager'

const { targetToAttack, setTargetToAttack } = useAttack()
const { player } = usePlayer()
const { activeScene } = useSceneManager()
const { activeTurnState, turnNumber, turnOrder } = useTurn()

const enemyList = turnOrder.value
</script>

<template>
    <div id="top-bar">
        <h2 v-if="activeScene" id="levelName" class="level__name">{{ activeScene.name }}</h2>
        <p style="text-align: center">Room: {{ activeScene?.currentRoom?.name }}</p>
        <p style="text-align: center">{{ activeTurnState }}</p>
        <p style="text-align: center">Turn: {{ turnNumber }}</p>
        <h3 id="turnNumber" class="text--center"></h3>
        <div class="health__display">
            <div class="player-hp">
                <h2>{{ player?.name }}</h2>
                <p id="playerHp" class="health--player">{{ player.currentStats.hp ? player.currentStats.hp : 0 }}</p>
            </div>
            <template v-for="enemy in enemyList" :key="enemy.id">
                <div v-if="enemy.isAlive" class="monster-hp" :class="{ 'monster-hp--active': targetToAttack === enemy }">
                    <h2 @click="setTargetToAttack(enemy)" id="monsterName">
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
