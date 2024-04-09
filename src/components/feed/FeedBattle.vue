<script setup lang="ts">
import { useSceneManager } from '@/composables/useSceneManager'
import { useFeedStore } from '@/stores/useFeed'
import { computed, nextTick, ref, watch } from 'vue'
const { activeScene } = useSceneManager()
const feedStore = useFeedStore()

const monsterList = computed(() => activeScene.value?.currentRoom?.monsterList.map((monster) => monster.name))

feedStore.setBattleFeedItem(`You are being attacked by ${monsterList.value?.length} enemies: ${monsterList.value}`)

const feedList = ref<HTMLElement>()
watch(
    () => feedStore.feedBattleList.length,
    () => {
        if (!feedList.value || !feedList.value.lastElementChild) {
            return
        }
        nextTick(() => {
            ;(feedList.value?.lastElementChild as HTMLElement).scrollIntoView(true)
        })
    }
)
</script>

<template>
    <div class="o-feed__container" ref="feedList">
        <div class="o-feed__item" v-for="feedItem in feedStore.feedBattleList" :key="feedItem">
            {{ feedItem.replace(',', ', ') }}
        </div>
    </div>
</template>
