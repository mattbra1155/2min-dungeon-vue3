<script setup lang="ts">
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { onMounted } from 'vue'
import { Scene } from '@/assets/models/sceneModel'
import { RoomExit } from '@/assets/models/RoomModel'
import { useSceneManager } from '@/composables/useSceneManager'
import { ERoomTypes } from '@/enums/ERoomTypes'
import localtions from '@/assets/json/locations.json'
import router from '@/router'
import { Town } from '@/assets/models/sceneTownModel'

const { activeScene, setScene } = useSceneManager()
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()

const town = new Town()

const addKeybindings = () => {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'i') {
            toggleInventory()
        }
        if (event.key === 'c') {
            toggleCharacterScreen()
        }
        if (event.key === 'w') {
            // player.value.moveTo()
        }
        if (event.key === 'd') {
            // toggleCharacterScreen()
        }
        if (event.key === 's') {
            // toggleCharacterScreen()
        }
        if (event.key === 'a') {
            // toggleCharacterScreen()
        }
    })
}

// const moveToRoom = async (roomId: EDirections) => {
//     if (!activeScene.value) {
//         return
//     }
//     if (roomId === EDirections.Wall) {
//         console.log('wall')
//         return
//     }

//     const getRoom = () => activeScene.value?.roomList.find((room) => parseInt(room.id) === roomId)

//     const room = getRoom()
//     if (!room) {
//         return
//     }
//     activeScene.value.changeCurrentRoom(room)
//     console.log('active room', activeScene.value.currentRoom)

//     await localforage.setItem('activeScene', JSON.stringify(activeScene.value))
// }

const moveToScene = (sceneId: string) => {
    const sceneData = localtions.find((scene) => scene.id === sceneId)

    if (!activeScene.value) {
        console.error('no active Scene')
        return
    }
    if (!sceneData) {
        console.error('no Scene found')
        return
    }

    if (activeScene.value.id !== 'town' && sceneId === 'town') {
        router.push({ name: 'town' })
        return
    }

    const scene = Object.assign(new Scene(), sceneData)

    setScene(scene)
}

const enterShop = (shopId: string) => {
    town.activeShopId = shopId
}

onMounted(() => {
    addKeybindings()
})
</script>

<template>
    <div v-if="activeScene" class="o-interface">
        <template v-for="sceneId in (activeScene.currentRoom as RoomExit)?.sceneLinks" :key="sceneId">
            <button
                class="a-button action__button"
                v-if="activeScene?.currentRoom?.type === ERoomTypes.Exit"
                @click="moveToScene(sceneId)"
            >
                Next Area
            </button>
        </template>
        <div class="o-interface__row">
            <button
                v-for="shop in town.shops"
                :key="shop.id"
                id="inventoryButton"
                type="button"
                class="a-button action__button"
                @click="enterShop(shop.id)"
            >
                {{ shop.name }}
            </button>
        </div>
        <div class="o-interface__row">
            <button id="inventoryButton" type="button" class="a-button action__button" @click="toggleInventory">
                Inventory
            </button>
            <button class="a-button action__button" @click="toggleCharacterScreen">Character Screen</button>
        </div>
    </div>
</template>
