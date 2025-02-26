<script setup lang="ts">
import FeedBattle from '@/components/feed/FeedBattle.vue'
import FeedTravel from '@/components/feed/FeedTravel.vue'
import FeedLoot from '@/components/feed/FeedLoot.vue'
import { EGameState } from '@/enums/EGameState'
import { useGameStateStore } from '@/stores/useGameStateManager'

const gameStateStore = useGameStateStore()
</script>

<template>
    <div class="o-feed">
        <FeedBattle v-if="gameStateStore.activeGameState === EGameState.Battle" />
        <FeedLoot v-else-if="gameStateStore.activeGameState === EGameState.Loot" />
        <FeedTravel v-else />
    </div>
</template>
