<script setup lang="ts">
import LayoutInterfaceTown from '@/components/layout/LayoutInterfaceTown.vue'
import { useSceneManager } from '@/composables/useSceneManager'
const { activeScene } = useSceneManager()
</script>

<template>
    <div class="o-town__header">
        <h1>{{ activeScene?.name }}</h1>
    </div>
    <LayoutInterfaceTown />
</template>
