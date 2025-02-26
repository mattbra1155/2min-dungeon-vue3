<script setup lang="ts">
import { useSceneManagerStore } from '@/stores/useSceneManager'
import { useFeedStore } from '@/stores/useFeed'
import { computed, nextTick, ref, watch } from 'vue'
import { MonsterModel } from '@/assets/models/monsterModel'
const sceneManager = useSceneManagerStore()
const feedStore = useFeedStore()

const monsterList = computed(
    () => sceneManager.activeRoom?.monsterList.map((monster: MonsterModel) => monster.name) || []
)

feedStore.setBattleFeedItem(`You are being attacked by: ${monsterList.value}`)

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
        <p class="o-feed__item" v-for="feedItem in feedStore.feedBattleList" :key="feedItem">
            {{ feedItem.replace(',', ', ') }}
        </p>
    </div>
</template>
