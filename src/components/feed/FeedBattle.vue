<script setup lang="ts">
import { useFeedStore } from '@/stores/useFeed'
import { nextTick, ref, watch } from 'vue'
const feedStore = useFeedStore()

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
