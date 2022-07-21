<template>
    <div class="home">
        <TopBar />
        <Feed />
        <Interface />
    </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import Feed from '@/components/layout/Feed.vue'
import TopBar from '@/components/layout/TopBar.vue'
import Interface from '@/components/layout/Interface.vue'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { usePlayer } from '@/composables/usePlayer'
import { useRouter } from 'vue-router'

export default defineComponent({
    components: {
        Feed,
        TopBar,
        Interface,
    },
    setup() {
        const { activeGameState } = useGameStateManager()
        const { activeTurnState, updateTurnStateMachine } = useTurn()
        const { player } = usePlayer()
        const router = useRouter()

        if (activeGameState.value === EGameState.Battle) {
            updateTurnStateMachine(ETurnState.Init)
        }

        watch(player.value, () => {
            if (player.value.isAlive === false) {
                router.push({ name: 'playerDead' })

            }

        })
        return {}
    }

})


</script>
