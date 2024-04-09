<script setup lang="ts">
import FeedBattle from '@/components/feed/FeedBattle.vue'
import FeedTravel from '@/components/feed/FeedTravel.vue'
import FeedLoot from '@/components/feed/FeedLoot.vue'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'

const { activeGameState } = useGameStateManager()
</script>

<template>
    <div class="o-feed">
        <FeedBattle v-if="activeGameState === EGameState.Battle" />
        <FeedLoot v-else-if="activeGameState === EGameState.Loot" />
        <FeedTravel v-else />
    </div>
</template>
