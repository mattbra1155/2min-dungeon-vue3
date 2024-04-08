<script setup lang="ts">
import { useSceneManager } from '@/composables/useSceneManager'
import { useFeedStore } from '@/stores/useFeed'
const { activeScene } = useSceneManager()
const feedStore = useFeedStore()

console.log(activeScene.value?.entityList)

const monsterList = () => {
    return activeScene.value?.currentRoom?.monsterList.map((monster) => monster.name)
}

feedStore.setBattleFeedItem(`You see ${monsterList()}`)
</script>

<template>
    <div class="feed__list">
        <div class="feed__item" v-for="feedItem in feedStore.feedBattleList" :key="feedItem">
            {{ feedItem.replace(',', ', ') }}
        </div>
    </div>
</template>
