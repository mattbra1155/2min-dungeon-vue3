<script setup lang="ts">
import { onMounted } from 'vue'
import { useTurn } from '@/composables/useTurn'
import { useRouter } from 'vue-router'
import { ETurnState } from '@/enums/ETurnState'
import { sceneManager } from '@/assets/models/SceneManager'
import { playerManager } from '@/assets/models/playerManager'

const router = useRouter()
const { turnModel } = useTurn()

const activeCharacter = sceneManager.scene?.entityList.find(entity => entity.id === turnModel.value.activeCharacterId)

onMounted(() => {
    playerManager.deadPlayer()
    turnModel.value.updateTurnStateMachine(ETurnState.Init)
    sceneManager.resetScene()
    sceneManager.createScene()
})
</script>

<template>
    <div class="m-main o-playerDead">
        <div class="o-playerDead__textContainer">
            <h1 class="o-playerDead__title">YOU DIED</h1>
            <p class="o-playerDead__text">
                you were killed by:<br />
                {{ activeCharacter?.name }} with a {{ activeCharacter?.weapon?.name }}
            </p>
            <button @click="router.push({ name: 'characterCreation' })" class="a-button">Try again</button>
        </div>
    </div>
</template>
