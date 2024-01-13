<script setup lang="ts">
import { useInventory } from '@/composables/useInventory'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { computed, onMounted } from 'vue'
import { EDirections } from '@/enums/EDirections'
import { Scene } from '@/assets/models/sceneModel'
import { useSceneManager } from '@/composables/useSceneManager'
import { ERoomTypes } from '@/enums/ERoomTypes'
import localtions from '@/assets/json/locations.json'
import router from '@/router'
import { RoomObject } from '@/assets/models/RoomObjectModel'
import { useFeed } from '@/composables/useFeed'

const { activeRoomObject, setActiveRoomObject } = useFeed()
const { activeScene, setScene, saveScene } = useSceneManager()
const { toggleInventory } = useInventory()
const { toggleCharacterScreen } = useCharacterScreen()

const isSearched = computed(() => activeScene.value?.currentRoom?.isSearched)

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

const moveToRoom = async (roomId: EDirections) => {
    if (!activeScene.value) {
        return
    }
    if (roomId === EDirections.Wall) {
        console.log('wall')
        return
    }

    activeScene.value.roomList.forEach((room) => {
        console.log(room.name, room.isExplored)
    })

    const getRoom = () => activeScene.value?.roomList.find((room) => parseInt(room.id) === roomId)

    const room = getRoom()

    if (!room) {
        return
    }

    activeScene.value.changeCurrentRoom(room.id)

    if (!activeScene.value.currentRoom) {
        console.error('No current Room')
        return
    }
    await saveScene(activeScene.value.id, activeScene.value.currentRoom.id, activeScene.value.roomList)
}

const moveToScene = (sceneId: string) => {
    activeScene.value?.currentRoom
    const sceneData = localtions.find((scene) => scene.id === sceneId)

    if (!sceneData) {
        console.error('no Scene found')
        return
    }

    const scene = Object.assign(new Scene(), sceneData)

    console.log(scene)

    setScene(scene)

    if (sceneId === 'town') {
        router.push({ name: 'town' })
        return
    }
}

const directionButton = (direction: number) =>
    Object.entries(EDirections).find((dir) => dir[0] === direction.toString())?.[1]

const searchRoom = () => {
    if (!activeScene.value || !activeScene.value.currentRoom) {
        console.error('SEARCH ROOM: no current room')
        return
    }
    activeScene.value.currentRoom.searchRoom()
}

const searchObject = (item: RoomObject) => {
    setActiveRoomObject(item)
}
onMounted(() => {
    addKeybindings()
})
</script>

<template>
    <div v-if="activeScene" class="o-interface">
        <div class="o-interface__row o-interface__objectActions">
            <template v-for="roomObject in activeScene.currentRoom?.roomObjects" :key="roomObject.id">
                <button
                    v-if="activeRoomObject?.id !== roomObject.id"
                    class="a-button action__button"
                    @click="searchObject(roomObject)"
                >
                    Search {{ roomObject.name }}
                </button>
            </template>
            <button class="a-button action__button" v-if="activeRoomObject" @click="setActiveRoomObject(null)">
                Room description
            </button>
        </div>
        <button class="a-button action__button" v-if="!isSearched" @click="searchRoom">Search Room</button>
        <div class="o-interface__row o-interface__directionWrapper">
            <template v-for="(direction, index) in activeScene.currentRoom?.exits" :key="index">
                <button v-if="direction !== -1" class="a-button action__button" @click="moveToRoom(direction)">
                    {{ directionButton(direction) }}
                </button>
            </template>

            <template v-for="(sceneId, index) in activeScene.currentRoom?.sceneLinks" :key="index">
                <button
                    class="a-button action__button"
                    v-if="activeScene?.currentRoom?.type === ERoomTypes.Exit"
                    @click="moveToScene(sceneId)"
                >
                    {{ sceneId }}
                    Next Area
                </button>
            </template>
        </div>
        <div class="o-interface__row">
            <button id="inventoryButton" type="button" class="a-button action__button" @click="toggleInventory">
                Inventory
            </button>
            <button class="a-button action__button" @click="toggleCharacterScreen">Character Screen</button>
        </div>
    </div>
</template>
