<script setup lang="ts">
import { usePlayer } from '@/composables/usePlayer'
import { Merchant } from '@/assets/models/shopModel'
import { diceRollK10 } from '@/assets/scripts/diceRoll'
import GoldCoin from '@/components/icons/GoldCoin.vue'
import { onMounted, ref } from 'vue'
import { useShop } from '@/composables/useShop'
const { player } = usePlayer()
const { setActiveShop } = useShop()

const merchant = new Merchant()

merchant.fillInventory(diceRollK10())

const words = ref<string>('')

const writeAnimation = () => {
    let i = 0
    const txt = 'Stay a while and listen...'
    const speed = 100

    function typeWriter() {
        if (i < txt.length) {
            words.value += txt.charAt(i)
            i++
            setTimeout(typeWriter, speed)
        }
    }
    typeWriter()
}

const exitMerchant = () => {
    setActiveShop(undefined)
}

onMounted(() => {
    writeAnimation()
})
</script>

<template>
    <div class="o-merchant">
        <div class="o-merchant__header">
            <h1 class="o-merchant__title">Merchant</h1>
            {{ merchant.gold }} GC
            <p class="a-text o-merchant__talk">{{ words }}</p>
            <button class="a-button o-merchant__close" @click="exitMerchant()">X</button>
        </div>
        <div class="o-merchant__table">
            <div class="o-merchant__itemList">
                SELL:
                <button
                    v-for="item in player.inventory.inventory"
                    :key="item.id"
                    class="a-button o-merchant__item"
                    @click="merchant.buyItem(item)"
                >
                    <p class="o-merchant__itemName">{{ item.name }}</p>
                    <p class="o-merchant__itemPrice">{{ item.price }} GC</p>
                </button>
            </div>
            <div class="o-merchant__itemList">
                BUY:
                <button
                    @click="merchant.sellItem(item.id)"
                    v-for="item in merchant.inventory"
                    :key="item.id"
                    class="a-button o-merchant__item"
                >
                    <p class="o-merchant__itemName">{{ item.name }}</p>
                    <p class="o-merchant__itemPrice">{{ item.price }} GC</p>
                </button>
            </div>
        </div>
    </div>
</template>
