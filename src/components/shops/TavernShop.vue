<script setup lang="ts">
import { usePlayer } from '@/composables/usePlayer'
import { Tavern } from '@/assets/models/shopModel'
import { diceRollK10 } from '@/assets/scripts/diceRoll'
import { onMounted, reactive, ref } from 'vue'
import { useShop } from '@/composables/useShop'
import { AllItemTypes } from '@/interfaces/IItem'

const { player } = usePlayer()
const { setActiveShop } = useShop()

const words = ref<string>('')
const tavern = reactive(new Tavern())
tavern.fillInventory(2 + diceRollK10())
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
    if (tavern.gold < item.price) {
        writeAnimation('I don`t have any more gold')
        console.log('SHOP: Tavern Keeper doesnt have enough gold')
        return
    }
    console.log(isWriting.value)
    writeAnimation('Great doing business with you...')
    tavern.buyItem(item, 2)
}

const playerBuyItem = (item: AllItemTypes) => {
    if (player.value.inventory.gold < item.price) {
        writeAnimation(`You don't have enough gold for ${item.name}`)
        console.log('SHOP: Player doesnt have enough gold')
        return
    }
    writeAnimation(`This ${item.name} will help you greatly`)
    tavern.sellItem(item.id, 0.8)
}

onMounted(() => {
    writeAnimation('Stay a while and listen...')
})
</script>

<template>
    <div class="o-merchant">
        <div class="o-merchant__header">
            <h1 class="o-merchant__title">Tavern</h1>
            Your Gold: {{ player.inventory.gold }} <br />

            Tavern Keeper's Gold: {{ tavern.gold }} GC
            <p class="a-text o-merchant__talk">{{ words }}</p>
            <button class="a-button o-merchant__close" @click="exitMerchant()">X</button>
        </div>
        <div class="o-merchant__table">
            <div class="o-merchant__itemList">
                SELL:
                <template
                    v-for="item in player.inventory.inventory.filter((invItem) => invItem.category === 'food')"
                    :key="item.id"
                >
                    <button v-if="!item.isEquipped" class="a-button o-merchant__item" @click="playerSellItem(item)">
                        <p class="o-merchant__itemName">{{ item.name }}</p>
                        <p class="o-merchant__itemPrice">{{ (item.price / 2).toFixed() }} GC</p>
                    </button>
                </template>
            </div>
            <div class="o-merchant__itemList">
                BUY:
                <button
                    @click="playerBuyItem(item)"
                    v-for="item in tavern.inventory"
                    :key="item.id"
                    class="a-button o-merchant__item"
                >
                    <p class="o-merchant__itemName">{{ item.name }}</p>
                    <p class="o-merchant__itemPrice">{{ (item.price / 0.8).toFixed() }} GC</p>
                </button>
            </div>
        </div>
    </div>
</template>
