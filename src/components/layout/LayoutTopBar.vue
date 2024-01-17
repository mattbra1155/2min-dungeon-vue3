<script setup lang="ts">
import { useAttack } from '@/composables/useAttack'
import { usePlayer } from '@/composables/usePlayer'
import { useTurn } from '@/composables/useTurn'
import { useSceneManager } from '@/composables/useSceneManager'
import { computed } from 'vue'
import { EGameState } from '@/enums/EGameState'
import { useGameStateManager } from '@/composables/useGameStateManager'

const { targetToAttack, setTargetToAttack } = useAttack()
const { player } = usePlayer()
const { activeScene } = useSceneManager()
const { activeGameState } = useGameStateManager()
const { activeTurnState, turnNumber, turnOrder } = useTurn()

const enemyList = computed(() => turnOrder.value)

const activeRoom = computed(() => activeScene.value?.currentRoom)
</script>

<template>
    <div id="top-bar">
        <h2 v-if="activeScene" id="levelName" class="level__name">{{ activeScene.name }}</h2>
        <p style="text-align: center">Room: {{ activeRoom?.name }}</p>
        {{ activeScene?.id }}
        <template v-if="activeGameState === EGameState.Battle">
            <p style="text-align: center">{{ activeTurnState }}</p>
            <p style="text-align: center">Turn: {{ turnNumber }}</p>
        </template>
        <div class="health__display">
            <div class="player-hp">
                <h2>{{ player?.name }}</h2>
                <p id="playerHp" class="health--player">{{ player.currentStats.hp ? player.currentStats.hp : 0 }}</p>
            </div>
            <template v-for="enemy in enemyList" :key="enemy.id">
                <div
                    v-if="enemy.isAlive"
                    class="monster-hp"
                    :class="{ 'monster-hp--active': targetToAttack === enemy }"
                >
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
