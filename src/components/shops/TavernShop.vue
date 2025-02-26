<script setup lang="ts">
import { usePlayer } from '@/composables/usePlayer'
import { Tavern } from '@/assets/models/shopModel'
import { diceRollK10 } from '@/helpers/diceRoll'
import { onMounted, reactive, ref } from 'vue'
import { useShop } from '@/composables/useShop'
import { AllItemTypes } from '@/interfaces/IItem'

const playerStore = usePlayerStore()
const { setActiveShop } = useShop()

const arr = ref<string[]>([])
const words = ref<string>('')
const gossipWelcome = ref<string>()
const gossipMessage = ref<string>()
const tavern = reactive(new Tavern())
const isWriting = ref<boolean>(false)
const isShop = ref<boolean>(false)
const isGossip = ref<boolean>(false)

const sellMultiplier = ref<number>(2)
const buyMultiplier = ref<number>(0.5)
tavern.fillInventory(2 + diceRollK10())
tavern.gossip()

// Move this to a standalone function
const writeAnimation = (text: string) => {
    if (!isWriting.value) {
        isWriting.value = true
        let i = 0
        const txt = text
        const speed = 50
        words.value = ''

        const typeWriter = () => {
            if (i < txt.length) {
                words.value += txt.charAt(i)
                i++
                setTimeout(typeWriter, speed)
                // console.log(words.value, i, txt.length)
                // console.log('tt')
                // console.log(isWriting.value)
                // console.log('length', i === txt.length)

                if (i === txt.length) {
                    // console.log(isWriting.value)
                    isWriting.value = false
                    arr.value.push(words.value)

                    return
                }
                // console.log(isWriting.value)
                isWriting.value = true
            }
        }
        typeWriter()
        // arr.value.push(words.value)
        // console.log(arr.value)
    }
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
    tavern.buyItem(item, buyMultiplier.value)
}

const playerBuyItem = (item: AllItemTypes) => {
    if (playerStore.player.inventory.gold < item.price) {
        writeAnimation(`You don't have enough gold for ${item.name}`)
        console.log('SHOP: Player doesnt have enough gold')
        return
    }
    writeAnimation(`This ${item.name} will help you greatly`)
    tavern.sellItem(item.id, sellMultiplier.value)
}

const startGossip = () => {
    isGossip.value = true
    isShop.value = false
    // words.value = '123'
    // words.value = tavern.gossipWelcome
    console.log('here')
    writeAnimation(tavern.gossipWelcome)
    console.log('here1')
    gossipMessage.value = tavern.getGossipMessage()
    console.log(tavern.getGossipMessage())

    console.log('here2')
}
const startShop = () => {
    words.value = ''
    writeAnimation('Here are my wares')
    isGossip.value = false
    isShop.value = true
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
            <div>
                <button class="a-button" @click="startGossip()">Gossip</button>
                <button class="a-button" @click="startShop()">Buy/sell</button>
            </div>
        </div>
        <div v-if="isGossip" class="o-merchant__gossip">
            <template v-if="isGossip">
                <p>{{ gossipWelcome }}</p>
                <p>{{ gossipMessage }}</p>
            </template>
        </div>
        <div v-if="isShop" class="o-merchant__table">
            <div class="o-merchant__itemList">
                SELL:
                <template
                    v-for="item in player.inventory.inventory.filter((invItem) => invItem.category === 'food')"
                    :key="item.id"
                >
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
                    v-for="item in tavern.inventory"
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
