import { defineStore } from 'pinia'
import localforage from 'localforage'
import locations from '@/assets/json/locations.json'
import { ref } from 'vue'
import { Room } from '@/assets/models/RoomModel'
import { MonsterModel } from '@/assets/models/monsterModel'
import { Status } from '@/assets/models/statusModel'
import { Inventory } from '@/assets/models/inventoryModel'
import { Container } from '@/assets/models/RoomObjectModel'
import { EGameState } from '@/enums/EGameState'
import { useFeedStore } from '@/stores/useFeed'
import { monsterGenerator } from '@/App.vue'
import { usePlayerPositionStore } from './usePlayerPosition'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { AllItemTypes } from '@/interfaces/IItem'
import { usePlayerStore } from './usePlayer'
import { useGameStateStore } from './useGameStateManager'
import { useTurnStore } from './useTurn'

interface Instance {
    id: string
    name: string
    map: any[]
}
export const useSceneManagerStore = defineStore('sceneManager', () => {
    const activeRoom = ref<Room>()
    const sceneList = ref<Room[]>([])
    const instanceList = ref<Room[]>([])
    const instance = ref<Instance>()
    const loadingArea = ref<boolean>(false)
    const itemGenerator = ref<any>(new ItemGenerator())
    const turnStore = useTurnStore()

    const addLocationToSceneList = (location: Room) => {
        if (sceneList.value.includes(location)) {
            return
        }

        sceneList.value.push(location)
    }
    const createLocation = async (x: number, y: number, locationId?: string) => {
        // find the location by ID or coords
        const locationData = locations.find(
            (location) => location.id === locationId || (location.x === x && location.y === y)
        )

        if (!locationData) {
            console.error('no location data')
            return
        }

        const locationClass = new Room()
        const location: Room = Object.assign(locationClass, locationData)

        if (location.roomObjects.length) {
            location.roomObjects = location.roomObjects.map((objectItem: any) => {
                const item = new Container(
                    objectItem.id,
                    objectItem.type,
                    objectItem.image,
                    objectItem.imageSearched,
                    objectItem.name,
                    objectItem.description,
                    objectItem.items,
                    objectItem.isSearched,
                    objectItem.isLocked,
                    objectItem.isHidden
                )

                if (objectItem.items && objectItem.items.length) {
                    item.items = objectItem.items.map((itemData: string) => {
                        const createdItem = itemGenerator.value.createItem(itemData)
                        return createdItem
                    })
                }
                return item
            })
        }

        addLocationToSceneList(location)

        return location
    }

    const moveToLocation = async (x: number, y: number) => {
        const feedStore = useFeedStore()
        console.log(useSceneManagerStore().activeRoom)

        let location = undefined

        if (instance.value) {
            location = instanceList.value.find((location) => location.x === x && location.y === y)
        } else {
            location = locations.find((location) => location.x === x && location.y === y)
        }

        if (!location) {
            console.error('cant find location')
            return
        }
        const createdLocation = await createLocation(location.x, location.y)
        if (!createdLocation) {
            console.error('No location crated')
            return
        }
        setActiveLocation(createdLocation)
        console.log(createdLocation)

        console.log(useSceneManagerStore().activeRoom)
        getClosestTiles()
        feedStore.setTravelFeedItem(`You have entered ${activeRoom.value?.name}.`)
        feedStore.setTravelFeedItem(`${activeRoom.value?.description}`)
    }

    const getClosestTiles = () => {
        const playerPosition = usePlayerPositionStore()
        const feedStore = useFeedStore()
        const closesTiles = ref<{
            north: Room | false
            east: Room | false
            south: Room | false
            west: Room | false
        }>({
            north: false,
            east: false,
            south: false,
            west: false,
        })
        if (playerPosition.coords.x === undefined || playerPosition.coords.y === undefined) {
            console.error('no player coords')
            return
        }
        closesTiles.value.north = getLocationData(playerPosition.coords.x, playerPosition.coords.y - 1)
        closesTiles.value.south = getLocationData(playerPosition.coords.x, playerPosition.coords.y + 1)
        closesTiles.value.east = getLocationData(playerPosition.coords.x + 1, playerPosition.coords.y)
        closesTiles.value.west = getLocationData(playerPosition.coords.x - 1, playerPosition.coords.y)

        console.log(closesTiles.value)

        if (closesTiles.value.north) {
            feedStore.setTravelFeedItem(`N: ${closesTiles.value.north.name}`)
        }
        if (closesTiles.value.east) {
            feedStore.setTravelFeedItem(`E: ${closesTiles.value.east.name}`)
        }
        if (closesTiles.value.south) {
            feedStore.setTravelFeedItem(`S: ${closesTiles.value.south.name}`)
        }
        if (closesTiles.value.west) {
            feedStore.setTravelFeedItem(`W: ${closesTiles.value.west.name}`)
        }
    }

    const getLocationData = (x: number, y: number) => {
        let foundLocation = undefined
        if (instance.value) {
            foundLocation = instanceList.value.find((location) => location.x === x && location.y === y)
        } else {
            const locationData = locations.find((location) => location.x === x && location.y === y)

            const locationClass = new Room()
            const location: Room = Object.assign(locationClass, locationData)
            foundLocation = location
        }

        if (!foundLocation) {
            return false
        }

        return foundLocation
    }

    const checkIfChangeRoomIsPossible = async (roomX: number, roomY: number) => {
        const playerStore = usePlayerStore()
        const gameStateStore = useGameStateStore()
        const feedStore = useFeedStore()

        if (!playerStore.player) {
            console.error('No Player')
            return
        }
        console.log('x', roomX, 'y', roomY)

        if (instance.value) {
            activeRoom.value = instanceList.value.find((room) => room.x === roomX && room.y === roomY)
        } else {
            const locationData = getLocationData(roomX, roomY)
            if (!locationData) {
                return false
            }
            console.log(locationData)

            activeRoom.value = await createLocation(locationData.x, locationData.y)
        }

        if (!activeRoom.value) {
            console.error('No Room found')
            return false
        }
        if (activeRoom.value.id === 'wall') {
            feedStore.setTravelFeedItem('You smash your face at a wall')
            return false
        }
        if (activeRoom.value.id === 'water') {
            feedStore.setTravelFeedItem('The water is to deep. You need a boat.')
            return false
        }
        if (
            activeRoom.value.id === 'mountains' &&
            !playerStore.player?.inventory.inventory.find((item: any) => item.id === 'climbing_equipment')
        ) {
            feedStore.setTravelFeedItem(`The mountains are too steep. You need climbing equipment to travel.`)
            return false
        }
        if (activeRoom.value.id === 'high_mountains') {
            feedStore.setTravelFeedItem(`The high mountains are too dangerous to travel. You can't go further.`)
            return false
        }

        // if player is not holding torch and room is dark stop him from entering
        if (activeRoom.value.isDark && playerStore.player.offHand?.id !== 'torch') {
            feedStore.setTravelFeedItem('The room is completely dark. You need a lightsource to enter')
            return false
        }

        feedStore.setActiveRoomObject(undefined)

        // If Room is explored - monster defeated before - don't create another one
        if (activeRoom.value.isExplored) {
            return true
        }

        // If Room is not explored and there is no monsters present - set Room as explored
        // if (!activeRoom.value.monsterList.length) {
        //     activeRoom.value.isExplored = true
        //     return true
        // }

        // createEnemyList(activeRoom.value.monsterList.map((monster) => monster.originId))
        // console.log('hhh')

        // gameStateStore.updateGameState(EGameState.Battle)
        return true
    }

    const createMonster = (monsterId?: string) => {
        const monster = monsterGenerator.create(monsterId)
        return monster
    }

    const createEnemyList = (enemiesToCreate: string[]) => {
        enemiesToCreate.forEach((monsterId: string) => {
            const enemy = createMonster(monsterId)
            turnStore.monsterList.push(enemy)
        })
    }

    const setActiveLocation = (location: Room) => {
        const playerPosition = usePlayerPositionStore()
        activeRoom.value = location
        playerPosition.updateCoords(activeRoom.value.x, activeRoom.value.y)
    }

    const resetRoom = () => {
        activeRoom.value = undefined
        localforage.removeItem('activeRoom')
    }
    const resetRoomList = () => {
        sceneList.value = []
        localforage.removeItem('exploredSceneList')
    }

    const saveScene = async (currentRoom: { x: number; y: number }, visitedLocationList: Room[]) => {
        // TO DO
        // move all arguments here instead of passing it each time
        const seen: any = []
        // save and remove cyclic objects from store

        await localforage.setItem(
            'activeRoom',
            JSON.stringify({ currentRoomCoords: currentRoom, visitedLocationList }, function (key, val) {
                if (val != null && typeof val == 'object') {
                    if (seen.indexOf(val) >= 0) {
                        return
                    }
                    seen.push(val)
                }
                return val
            })
        )

        // save Scene List
        await localforage.setItem('savedSceneList', JSON.stringify(sceneList.value))
    }
    const loadScene = async () => {
        const itemGenerator = new ItemGenerator()
        // load and save sceneList.value
        const sceneListData = JSON.parse((await localforage.getItem('savedSceneList')) as string)

        if (!sceneListData) {
            console.error('Load: no scene List saved')
            return
        }
        sceneList.value = sceneListData.map((sceneData: Room) => {
            const locationClass = new Room()
            const location: Room = Object.assign(locationClass, sceneData)
            location.monsterList = location.monsterList.map((monster) => {
                const ttt = new MonsterModel()
                const newMonster = Object.assign(ttt, monster)
                newMonster.inventory = new Inventory()
                newMonster.inventory = monster.inventory
                newMonster.status = new Status()
                return newMonster
            })
            if (location.roomObjects.length) {
                location.roomObjects = location.roomObjects.map((objectItem: Container) => {
                    const item = new Container(
                        objectItem.id,
                        objectItem.type,
                        objectItem.image,
                        objectItem.imageSearched,
                        objectItem.name,
                        objectItem.description,
                        objectItem.items,
                        objectItem.isSearched,
                        objectItem.isLocked,
                        objectItem.isHidden
                    )

                    if (objectItem.items.length) {
                        item.items = objectItem.items.map((itemData: AllItemTypes) => {
                            const createdItem = itemGenerator.createItem(itemData.category)
                            return createdItem
                        })
                    }
                    return item
                })
            }

            if (location.name === 'Burned down farm') {
                location.image = 'images/burnedDownFarm.jpeg'
            }

            return location
        })

        // load scene
        interface payload {
            currentRoomCoords: {
                x: number
                y: number
            }
            visitedLocationList: Room[]
        }
        const data: string = (await localforage.getItem('activeRoom')) as string
        const savedSceneData: payload = JSON.parse(data)

        if (!savedSceneData) {
            console.error('CRATE SCENE: No saved scene')
            if (!activeRoom.value) {
                console.error('Load: No active room')
                return
            }
            await checkIfChangeRoomIsPossible(19, 22)
            return
        }

        await checkIfChangeRoomIsPossible(savedSceneData.currentRoomCoords.x, savedSceneData.currentRoomCoords.y)

        // const location: Room = new Room()
        // location.fetchLocationDetails(savedSceneData.sceneId)
        // location.roomList = location.roomList.map((room) => {
        //     const roomData = savedSceneData.roomList.find((roomData) => roomData.id === room.id)
        //     if (roomData) {
        //         room = roomData
        //     }
        //     room.monsterList = room.monsterList.map((monster) => {
        //         const ttt = new MonsterModel()
        //         const newMonster = Object.assign(ttt, monster)
        //         newMonster.inventory = new Inventory()
        //         newMonster.inventory = monster.inventory
        //         newMonster.status = new Status()
        //         return newMonster
        //     })
        //     room.roomObjects = room.roomObjects.map((objectItem) => {
        //         const itemClass = new RoomObject()
        //         const newObject = Object.assign(itemClass, objectItem)

        //         return newObject
        //     })

        //     if (room.name === 'Burned down farm') {
        //         room.image = 'images/burnedDownFarm.jpeg'
        //     }
        //     return Object.assign(new Room(), room)
        // })

        // location.checkIfChangeRoomIsPossible(savedSceneData.currentRoom)
    }
    return {
        loadingArea,
        instance,
        activeRoom,
        sceneList,
        instanceList,
        createLocation,
        setActiveLocation,
        moveToLocation,
        getClosestTiles,
        resetRoom,
        resetRoomList,
        saveScene,
        loadScene,
        checkIfChangeRoomIsPossible,
        getLocationData,
        createEnemyList,
    }
})
