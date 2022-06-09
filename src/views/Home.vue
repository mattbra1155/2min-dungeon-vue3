<template>
    <div class="home">
        <TopBar />
        <Feed />
        <Interface />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Feed from '@/components/layout/Feed.vue'
import TopBar from '@/components/layout/TopBar.vue'
import Interface from '@/components/layout/Interface.vue'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'
import { useTurn } from '@/composables'
import { ETurnState } from '@/enums/ETurnState'

export default defineComponent({
    components: {
        Feed,
        TopBar,
        Interface,
    },
    setup() {
        const { activeGameState } = useGameStateManager()
        const { activeTurnState, updateTurnStateMachine } = useTurn()

        if (activeGameState.value === EGameState.Battle) {
            updateTurnStateMachine(ETurnState.Init)
        }
        return {}
    }

})


</script>
