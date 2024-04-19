<script setup lang="ts">
import { useAttack } from '@/composables/useAttack'
import { usePlayer } from '@/composables/usePlayer'
import { useTurn } from '@/composables/useTurn'
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { computed } from 'vue'
import { EGameState } from '@/enums/EGameState'
import { useGameStateManager } from '@/composables/useGameStateManager'

const { targetToAttack, setTargetToAttack } = useAttack()
const { player } = usePlayer()
const sceneManager = useSceneManagerStore()
const { activeGameState } = useGameStateManager()
const { activeTurnState, turnNumber, turnOrder } = useTurn()

const enemyList = computed(() => turnOrder.value)

</script>

<template>
    <div id="top-bar" class="o-header">
        <h2 v-if="sceneManager.activeRoom" id="levelName" class="level__name">{{ sceneManager.activeRoom.name }}</h2>
        <!-- <p style="text-align: center">{{ sceneManager.activeRoom?.name }}</p> -->
        <div v-if="activeGameState === EGameState.Battle">
            <p style="text-align: center">{{ activeTurnState }}</p>
            <p style="text-align: center">Turn: {{ turnNumber }}</p>
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
