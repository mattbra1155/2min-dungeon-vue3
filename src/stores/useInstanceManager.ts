import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'
import { ILocation } from '@/interfaces/ILocation'
import { Room } from '@/assets/models/RoomModel'
import localforage from 'localforage'
import { MonsterModel } from '@/assets/models/monsterModel'
import { Status } from '@/assets/models/statusModel'
import { Inventory } from '@/assets/models/inventoryModel'
import { RoomObject } from '@/assets/models/RoomObjectModel'
import { EGameState } from '@/enums/EGameState'
import { useFeedStore } from '@/stores/useFeed'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { usePlayer } from '@/composables/usePlayer'
import instances from '@/assets/json/instances.json'
import { monsterGenerator } from '@/App.vue'
import { usePlayerPositionStore } from './usePlayerPosition'
export const useInstanceManagerStore = defineStore('InstanceManager', () => {
    const isActive = ref<boolean>(false)
    const activeRoom = ref<Room>()
    const sceneList = ref<Room[]>([])
    const loadingArea = ref<boolean>(false)
    const createLocations = (instanceId: string, entryId: string) => {
        const instance = instances.find(instanceItem => instanceItem.name === instanceId)
        console.log(instanceId, entryId);
        if (!instance) {
            console.error('No instance found')
            return
        }
        const locationList: Room[] = instance?.map.map((locationData) => {

            const locationClass = new Room()
            const location = Object.assign(locationClass, locationData)
            sceneList.value.push(location)
            return location

        })

        const getRoom = locationList.find(room => room.name === entryId)

        if (!getRoom) {
            return
        }
        console.log(getRoom);


        setRoom(getRoom)


        localforage.setItem('locationList', locationList)

    }

    const enterInstance = (x: number, y: number) => {

    }

    const getLocationData = (x: number, y: number) => {
        const feedStore = useFeedStore()

        const foundLocation = sceneList.value.find(location => location.x === x && location.y === y)

        if (!foundLocation) {
            return false
        }

        return foundLocation
    }

    const changeActiveRoom = (roomX: number, roomY: number) => {
        const { player } = usePlayer()
        const { updateGameState } = useGameStateManager()
        const feedStore = useFeedStore()


        console.log('x', roomX, 'y', roomY);

        activeRoom.value = sceneList.value.find((room) => room.x === roomX && room.y === roomY)

        if (!activeRoom.value) {
            console.error('No Room found')
            return false
        }
        if (activeRoom.value.id === 'water') {
            feedStore.setTravelFeedItem('The water is to deep. You need a boat.')
            return false
        }


        if (activeRoom.value.id === 'wall') {
            feedStore.setTravelFeedItem('You bumped into a wall.')
            return false
        }


        // if player is not holding torch and room is dark stop him from entering
        if (activeRoom.value.isDark && player.value.offHand?.id !== 'torch') {
            feedStore.setTravelFeedItem('The room is completely dark. You need a lightsource to enter')
            return false
        }

        feedStore.setActiveRoomObject(undefined)

        // If Room is explored - monster defeated before - don't create another one
        if (activeRoom.value.isExplored) {
            return true
        }

        // If Room is not explored and there is no monsters present - set Room as explored
        if (!activeRoom.value.monsterList.length) {
            activeRoom.value.isExplored = true
            return true
        }

        createEnemyList(activeRoom.value.monsterList.map((monster) => monster.originId))
        updateGameState(EGameState.Battle)
        return true
    }

    const createMonster = (monsterId?: string) => {
        const monster = monsterGenerator.create(monsterId)
        return monster
    }

    const createEnemyList = (enemiesToCreate: string[]) => {
        const enemyList: MonsterModel[] = []
        enemiesToCreate.forEach((monsterId: string) => {
            const enemy = createMonster(monsterId)
            enemyList.push(enemy)
        })
        return enemyList
    }

    const setRoom = (scene: Room) => {
        const playerPosition = usePlayerPositionStore()
        activeRoom.value = scene
        playerPosition.updateCoords(activeRoom.value.x, activeRoom.value.y)

    }

    const resetRoom = () => {
        activeRoom.value = undefined
        localforage.removeItem('activeRoom')
    }
    const resetRoomList = () => {
        sceneList.value = []
        localforage.removeItem('exploredsceneList')
    }

    const saveScene = async (currentRoom: { x: number, y: number }, locationList: Room[]) => {
        // TO DO
        // move all arguments here instead of passing it each time
        const seen: any = []
        // save and remove cyclic objects from store
        console.log(currentRoom);

        await localforage.setItem(
            'activeRoom',
            JSON.stringify({ currentRoomCoords: currentRoom, locationList }, function (key, val) {
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
        await localforage.setItem('savedsceneList', JSON.stringify(sceneList.value))
    }
    const loadScene = async () => {
        // load and save sceneList.value
        const sceneListData = JSON.parse((await localforage.getItem('savedsceneList')) as string)

        if (!sceneListData) {
            console.log('no scene List saved');

            return
        }
        sceneList.value = sceneListData.map((sceneData: Room) => {
            const locationClass = new Room()
            const location = Object.assign(locationClass, sceneData)
            location.monsterList = location.monsterList.map((monster) => {
                const ttt = new MonsterModel()
                const newMonster = Object.assign(ttt, monster)
                newMonster.inventory = new Inventory()
                newMonster.inventory = monster.inventory
                newMonster.status = new Status()
                return newMonster
            })
            location.roomObjects = location.roomObjects.map((objectItem) => {
                const itemClass = new RoomObject()
                const newObject = Object.assign(itemClass, objectItem)

                return newObject
            })

            return location
        })


        console.log(sceneList.value);


        // load scene
        interface payload {
            currentRoomCoords: {
                x: number
                y: number
            }
            locationList: Room[]
        }
        const data: string = (await localforage.getItem('activeRoom')) as string
        const savedSceneData: payload = JSON.parse(data)

        console.log(savedSceneData);

        if (!savedSceneData) {
            console.error('CRATE SCENE: No saved scene')
            if (!activeRoom.value) {
                return
            }
            const entry = activeRoom.value
            if (!entry) {
                return
            }

            changeActiveRoom(19, 22)
            return
        }
        console.log(savedSceneData);

        changeActiveRoom(savedSceneData.currentRoomCoords.x, savedSceneData.currentRoomCoords.y)

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

        // location.changeActiveRoom(savedSceneData.currentRoom)

    }
    return {
        isActive,
        loadingArea,
        activeRoom,
        sceneList,
        createLocations,
        setRoom,
        resetRoom,
        resetRoomList,
        saveScene,
        loadScene,
        changeActiveRoom,
        getLocationData,
        createEnemyList
    }


})
