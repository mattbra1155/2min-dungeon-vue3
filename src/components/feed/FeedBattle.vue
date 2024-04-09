<script setup lang="ts">
import { useSceneManager } from '@/composables/useSceneManager'
import { useFeedStore } from '@/stores/useFeed'
import { computed } from 'vue'
const { activeScene } = useSceneManager()
const feedStore = useFeedStore()

const monsterList = computed(() => activeScene.value?.currentRoom?.monsterList.map((monster) => monster.name))

feedStore.setBattleFeedItem(`You are being attacked by ${monsterList.value?.length} enemies: ${monsterList.value}`)
</script>

<template>
    <div class="o-feed__container">
        <div class="o-feed__item" v-for="feedItem in feedStore.feedBattleList" :key="feedItem">
            {{ feedItem.replace(',', ', ') }}
        </div>
    </div>
</template>
