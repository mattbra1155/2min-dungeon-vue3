<script setup lang="ts">
const props = defineProps<{
    icon: any
}>()
console.log(props.icon)
</script>
<template>
    <i class="a-icon">
        <component :is="props.icon" />
    </i>
</template>
