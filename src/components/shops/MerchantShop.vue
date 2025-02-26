<script setup lang="ts">
import { usePlayer } from '@/composables/usePlayer'
import { Merchant } from '@/assets/models/shopModel'
import { diceRollK10, diceRollK4 } from '@/helpers/diceRoll'
import { computed, ComputedRef, onMounted, reactive, ref } from 'vue'
import { useShop } from '@/composables/useShop'
import localforage from 'localforage'
import { AllItemTypes } from '@/interfaces/IItem'
// import { writeAnimation } from '@/utils/writeAnimation'
const playerStore = usePlayerStore()
const { setActiveShop } = useShop()

const sellMultiplier = ref<number>(3)
const buyMultiplier = ref<number>(0.5)
const words = ref<string>('')
const merchant = reactive(new Merchant())
merchant.fillInventory(diceRollK4())
const isWriting = ref<boolean>(false)

// Move this to a standalone function
const writeAnimation = (text: string) => {
    let i = 0
    const txt = text
    const speed = 50
    words.value = ''
    isWriting.value = true

    function typeWriter() {
        if (i < txt.length) {
            words.value += txt.charAt(i)
            i++
            setTimeout(typeWriter, speed)
        }
    }
    isWriting.value = false

    typeWriter()
}

const exitMerchant = () => {
    setActiveShop(undefined)
}

const playerSellItem = (item: AllItemTypes) => {
    if (merchant.gold < item.price) {
        writeAnimation('I don`t have any more gold')
        console.log('SHOP: Merchant doesnt have enough gold')
        return
    }
    console.log(isWriting.value)
    writeAnimation('Great doing business with you...')
    merchant.buyItem(item, buyMultiplier.value)
}

const playerBuyItem = (item: AllItemTypes) => {
    if (playerStore.player.inventory.gold < item.price) {
        writeAnimation(`You don't have enough gold for ${item.name}`)
        console.log('SHOP: Player doesnt have enough gold')
        return
    }
    writeAnimation(`This ${item.name} will help you greatly`)
    merchant.sellItem(item.id, sellMultiplier.value)
}

onMounted(() => {
    writeAnimation('Stay a while and listen...')
})
</script>

<template>
    <div class="o-merchant">
        <div class="o-merchant__header">
            <h1 class="o-merchant__title">Merchant</h1>
            Your Gold: {{ player.inventory.gold }} <br />

            Merchant Gold: {{ merchant.gold }} GC
            <p class="a-text o-merchant__talk">{{ words }}</p>
            <button class="a-button o-merchant__close" @click="exitMerchant()">X</button>
        </div>
        <div class="o-merchant__table">
            <div class="o-merchant__itemList">
                SELL:
                <template v-for="item in player.inventory.inventory" :key="item.id">
                    <button v-if="!item.isEquipped" class="a-button o-merchant__item" @click="playerSellItem(item)">
                        <p class="o-merchant__itemName">{{ item.name }}</p>
                        <p class="o-merchant__itemPrice">{{ item.price * buyMultiplier }} GC</p>
                    </button>
                </template>
            </div>
            <div class="o-merchant__itemList">
                BUY:
                <button
                    @click="playerBuyItem(item)"
                    v-for="item in merchant.inventory"
                    :key="item.id"
                    class="a-button o-merchant__item"
                >
                    <p class="o-merchant__itemName">{{ item.name }}</p>
                    <p class="o-merchant__itemPrice">{{ item.price * sellMultiplier }} GC</p>
                </button>
            </div>
        </div>
    </div>
</template>
