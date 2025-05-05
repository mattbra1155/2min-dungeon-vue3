<script setup lang="ts">
import { useAttack } from '@/composables/useAttack'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { computed } from 'vue'
import { EGameState } from '@/enums/EGameState'
import { useGameStateStore } from '@/stores/useGameStateManager'
import { useTurnStore } from '@/stores/useTurn'

const { targetToAttack, setTargetToAttack } = useAttack()
const sceneManager = useSceneManagerStore()
const gameStateStore = useGameStateStore()
const turnStore = useTurnStore()

const enemyList = computed(() => turnStore.turnOrder)
const instance = computed(() =>
    sceneManager.instanceList.find((location: any) => location.id === sceneManager.instance?.id)
)
</script>

<template>
    <div id="top-bar" class="o-header">
        <h2
            v-if="sceneManager.activeRoom && gameStateStore.activeGameState === EGameState.Travel"
            id="levelName"
            class="level__name"
        >
            {{ sceneManager.activeRoom.name }}
        </h2>
        <p v-if="sceneManager.instance" style="text-align: center">{{ instance }}</p>
        <div v-if="gameStateStore.activeGameState === EGameState.Battle">
            <p style="text-align: center">{{ turnStore.activeTurnState }}</p>
            <p style="text-align: center">Turn: {{ turnStore.turnNumber }}</p>
        </div>
        <div class="o-header__healthWrapper">
            <template v-for="enemy in enemyList" :key="enemy.id">
                <div
                    v-if="enemy.isAlive"
                    class="o-header__healthItem --enemy"
                    :class="{ '--active': targetToAttack === enemy }"
                >
                    <h2 @click="setTargetToAttack(enemy)" class="o-header__name" id="monsterName">
                        {{ enemy.name ? enemy.name : 'placeholder enemy' }}
                    </h2>
                    <p id="monsterHp" class="health--monster">
                        <meter min="0" :max="enemy.stats.hp" low="30" :value="enemy.currentStats.hp">
                            {{ enemy.currentStats.hp ? enemy.currentStats.hp : 0 }}
                        </meter>
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>
