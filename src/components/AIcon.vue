<script setup lang="ts">
const props = defineProps<{
    icon: any
}>()
</script>
<template>
    <i class="a-icon">
        <component :is="props.icon" />
    </i>
</template>
