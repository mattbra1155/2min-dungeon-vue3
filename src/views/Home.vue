<template>
    <div class="home">
        <TopBar />
        <Feed />
        <Interface />
    </div>
</template>

<script>
import Feed from '@/components/layout/Feed'
import TopBar from '@/components/layout/TopBar'
import Interface from '@/components/layout/Interface'
export default {    
    components: {
        Feed,
        TopBar,
        Interface
    },
    data() {
        return {
            name: 'Main'
        }
    }
}
</script>
