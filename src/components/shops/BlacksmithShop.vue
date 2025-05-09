<script setup lang="ts">
import { Blacksmith } from '@/assets/models/shopModel'
import { diceRollK10 } from '@/helpers/diceRoll'
import { onMounted, reactive, ref } from 'vue'
import { useShop } from '@/composables/useShop'
import { AllItemTypes } from '@/interfaces/IItem'
import { usePlayerStore } from '@/stores/usePlayer'
// import { writeAnimation } from '@/utils/writeAnimation'
const playerStore = usePlayerStore()
const { setActiveShop } = useShop()

const sellMultiplier = ref<number>(2)
const buyMultiplier = ref<number>(0.5)
const words = ref<string>('')
const blacksmith = reactive(new Blacksmith())
blacksmith.fillInventory(diceRollK10())
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

const playerSellitem = (item: AllItemTypes) => {
    if (blacksmith.gold < item.price) {
        writeAnimation('I don`t have any more gold')
        console.log('SHOP: Blacksmith doesnt have enough gold')
        return
    }
    console.log(isWriting.value)
    writeAnimation('Great doing business with you...')
    blacksmith.buyItem(item, buyMultiplier.value)
}

const playerBuyItem = (item: AllItemTypes) => {
    if (!playerStore.player) {
        return
    }
    if (playerStore.player.inventory.gold < item.price) {
        writeAnimation(`You don't have enough gold for ${item.name}`)
        console.log('SHOP: Player doesnt have enough gold')
        return
    }
    writeAnimation(`This ${item.name} will help you greatly`)
    blacksmith.sellItem(item.id, sellMultiplier.value)
}

onMounted(() => {
    writeAnimation('Stay a while and listen...')
})
</script>

<template>
    <div class="o-merchant">
        <div class="o-merchant__header">
            <h1 class="o-merchant__title">Blacksmith</h1>
            Your Gold: {{ playerStore.player?.inventory.gold }} <br />

            Blacksmith's Gold: {{ blacksmith.gold }} GC
            <p class="a-text o-merchant__talk">{{ words }}</p>
            <button class="a-button o-merchant__close" @click="exitMerchant()">X</button>
        </div>
        <div class="o-merchant__table">
            <div class="o-merchant__itemList">
                SELL:
                <template
                    v-for="item in playerStore.player?.inventory.inventory.filter(
                        (invItem) =>
                            invItem.category === 'armor' ||
                            invItem.category === 'weapon' ||
                            invItem.category === 'material'
                    )"
                    :key="item.id"
                >
                    <button v-if="!item.isEquipped" class="a-button o-merchant__item" @click="playerSellitem(item)">
                        <p class="o-merchant__itemName">{{ item.name }}</p>
                        <p class="o-merchant__itemPrice">{{ item.price * buyMultiplier }} GC</p>
                    </button>
                </template>
            </div>
            <div class="o-merchant__itemList">
                BUY:
                <button
                    @click="playerBuyItem(item)"
                    v-for="item in blacksmith.inventory"
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
