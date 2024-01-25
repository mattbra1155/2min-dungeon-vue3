<script setup lang="ts">
import LayoutInterfaceTown from '@/components/layout/LayoutInterfaceTown.vue'
import MerchantShop from '@/components/shops/MerchantShop.vue'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { useSceneManager } from '@/composables/useSceneManager'
import { useShop } from '@/composables/useShop'
import { EGameState } from '@/enums/EGameState'
import { EShops } from '@/enums/EShops'
import { Town } from '@/assets/models/sceneTownModel'
import { onMounted, ref } from 'vue'

const { activeScene, setScene } = useSceneManager()
const { activeShopId } = useShop()
const { activeGameState } = useGameStateManager()

const town = new Town()

activeGameState.value = EGameState.Town

const descriptionShort = ref<string>('')
const descriptionLong = ref<string>('')
const showMoreButton = ref<boolean>(false)
const words = ref<string>('')
// Move this to a standalone function
const writeAnimation = (text: string) => {
    let i = 0
    const txt = text
    const speed = 50
    words.value = ''

    function typeWriter() {
        if (i < txt.length) {
            words.value += txt.charAt(i)
            i++
            setTimeout(typeWriter, speed)
        } else {
            showMoreButton.value = true
        }
    }

    typeWriter()
}

const showMoreDescription = () => {
    if (!town.description) {
        return
    }
    showMoreButton.value = false
    descriptionShort.value = words.value
    writeAnimation(town.description)
}
onMounted(() => {
    if (town.shortDescription) {
        writeAnimation(town.shortDescription)
    }
})
</script>

<template>
    <div class="o-town">
        <div class="o-town__header">
            <h1>{{ activeScene?.name }}</h1>
        </div>
        <div class="o-town__content">
            <!-- <div class="o-town__description --short" v-html="descriptionShort"></div> -->
            <div class="o-town__description --short" v-html="words"></div>
            <!-- <button class="a-button" v-if="showMoreButton" @click="showMoreDescription()">more</button> -->
            <!-- <div class="o-town__description --long" v-html="descriptionLong"></div> -->
        </div>
        <LayoutInterfaceTown :town="town" v-if="activeShopId === undefined" />
        <MerchantShop v-if="activeShopId === EShops.Merchant" />
    </div>
</template>
