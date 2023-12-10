<script setup lang="ts">
import { usePlayer } from '@/composables/usePlayer'
import { Merchant } from '@/assets/models/shopModel'
import { diceRollK10 } from '@/assets/scripts/diceRoll'
import { onMounted, reactive, ref } from 'vue'
import { useShop } from '@/composables/useShop'
import localforage from 'localforage'
import { AllItemTypes } from '@/interfaces/IItem'
const { player } = usePlayer()
const { setActiveShop } = useShop()

const words = ref<string>('')
const merchant = reactive(new Merchant())
merchant.fillInventory(diceRollK10())

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
        }
    }
    typeWriter()
}

const exitMerchant = () => {
    setActiveShop(undefined)
}

const sellItem = (item: AllItemTypes) => {
    if (merchant.gold < item.price) {
        writeAnimation('I don`t have any more gold')
        console.log('SHOP: Merchant doesnt have enough gold')
        return
    }
    writeAnimation('Great doing business with you...')
    merchant.buyItem(item)
}

const buyItem = (item: AllItemTypes) => {
    if (player.value.inventory.gold < item.price) {
        writeAnimation(`You don't have enough gold for ${item.name}`)
        console.log('SHOP: Player doesnt have enough gold')
        return
    }
    writeAnimation(`The ${item.name} will help you greatly`)
    merchant.sellItem(item.id)
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
                <button
                    v-for="item in player.inventory.inventory"
                    :key="item.id"
                    class="a-button o-merchant__item"
                    @click="sellItem(item)"
                >
                    <p class="o-merchant__itemName">{{ item.name }}</p>
                    <p class="o-merchant__itemPrice">{{ item.price }} GC</p>
                </button>
            </div>
            <div class="o-merchant__itemList">
                BUY:
                <button
                    @click="buyItem(item)"
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
