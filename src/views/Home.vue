<template>
    <div class="home">
        <TopBar />
        <Feed />
        <Interface />
    </div>
</template>

<script lang="ts">
import Feed from '@/components/layout/Feed.vue'
import TopBar from '@/components/layout/TopBar.vue'
import Interface from '@/components/layout/Interface.vue'
export default {
    components: {
        Feed,
        TopBar,
        Interface,
    },
    data() {
        return {
            name: 'Main',
        }
    },
}
</script>
