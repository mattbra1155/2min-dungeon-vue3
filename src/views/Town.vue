<script setup lang="ts">
import LayoutInterfaceTown from '@/components/layout/LayoutInterfaceTown.vue'
import MerchantShop from '@/components/shops/MerchantShop.vue'
import { useSceneManager } from '@/composables/useSceneManager'
import { useShop } from '@/composables/useShop'
import { EShops } from '@/enums/EShops'
const { activeScene } = useSceneManager()
const { activeShopId } = useShop()
</script>

<template>
    <div class="o-town">
        <div class="o-town__header">
            <h1>{{ activeScene?.name }}</h1>
        </div>
        <LayoutInterfaceTown />
        <MerchantShop v-if="activeShopId === EShops.Merchant" />
    </div>
</template>
