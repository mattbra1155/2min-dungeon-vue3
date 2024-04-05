<script setup lang="ts">
import { onMounted, ref, watch, withCtx } from 'vue'
import LayoutInterface from '@/components/layout/LayoutInterface.vue'
import LayoutFeed from '@/components/layout/LayoutFeed.vue'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { EGameState } from '@/enums/EGameState'
import { useTurn } from '@/composables/useTurn'
import { ETurnState } from '@/enums/ETurnState'
import { usePlayer } from '@/composables/usePlayer'
import { useRouter } from 'vue-router'
import LayoutTopBar from '@/components/layout/LayoutTopBar.vue'
import LayoutInterfaceTravel from '@/components/layout/LayoutInterfaceTravel.vue'
import { useSceneManager } from '@/composables/useSceneManager'
import { Sprite } from '@/assets/models/spriteModel'

const { loadScene } = useSceneManager()
const { activeGameState } = useGameStateManager()
const { updateTurnStateMachine, turnOrder } = useTurn()
const { player } = usePlayer()
const router = useRouter()

if (activeGameState.value === EGameState.Battle) {
    updateTurnStateMachine(ETurnState.Init)
}

watch(
    () => activeGameState.value,
    (state) => {
        if (state === EGameState.Travel) {
            updateTurnStateMachine(ETurnState.Disabled)
        }
        if (state === EGameState.Battle) {
            updateTurnStateMachine(ETurnState.Init)
        }
        if (state === EGameState.LevelCleared) {
            router.push({ name: 'levelFinished' })
        }
    }
)

watch(player.value, () => {
    if (player.value.isAlive === false) {
        router.push({ name: 'playerDead' })
    }
})

const canvas = ref<any>()
const spriteSize = 32
const upscaledSpriteSize = 128

const spriteSheet = new Image()
spriteSheet.src = '/images/monochrome_32x32_transparent.png'
spriteSheet.width = spriteSize
spriteSheet.height = spriteSize

const draw = () => {
    const ctx = canvas.value.getContext('2d')

    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = 200
    ctx.fillStyle = 'red'
    ctx.translate(0, 50)

    ctx.imageSmoothingEnabled = false

    // ctx.font = '20px Arial'
    // ctx.fillStyle = 'white'
    // ctx.fillText('Lesser Goblin', spriteX + (upscaledSpriteSize / 2 - textWidth), -10)

    if (!turnOrder.value?.length) {
        return
    }

    for (let i = 0; i < turnOrder.value.length; i++) {
        const monster = new Sprite(
            upscaledSpriteSize,
            i === 0 ? window.innerWidth / 2 - upscaledSpriteSize - 40 : window.innerWidth / 2 + 40,
            0,
            'red'
        )

        ctx.drawImage(
            spriteSheet,
            spriteSize * 4,
            spriteSize * 3,
            spriteSize,
            spriteSize,
            monster.spriteX,
            monster.spriteY,
            upscaledSpriteSize,
            upscaledSpriteSize
        )
    }

    // ctx.drawImage(img, 16, 16)
}

const update = () => {
    // spriteX += 1

    draw()

    window.requestAnimationFrame(update)
}

onMounted(async () => {
    await loadScene()
    update()
})
</script>

<template>
    <div class="home">
        <LayoutTopBar />
        <canvas v-if="activeGameState === EGameState.Battle" ref="canvas"></canvas>
        <LayoutFeed />
        <LayoutInterface v-if="activeGameState === EGameState.Battle" />
        <LayoutInterfaceTravel v-if="activeGameState === EGameState.Travel" />
    </div>
</template>
