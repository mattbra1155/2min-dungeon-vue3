<script setup lang="ts">
import { useGlobalStore } from '@/stores/useGlobal'
import LoaderIcon from './icons/LoaderIcon.vue'
const globalStore = useGlobalStore()
</script>

<template>
    <div class="o-loadingScreen">
        <!-- {{ globalStore.isLoading }} -->
        <LoaderIcon />
    </div>
</template>
