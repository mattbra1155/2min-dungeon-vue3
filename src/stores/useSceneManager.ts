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
import locations from '@/assets/json/locations.json'
import { monsterGenerator } from '@/App.vue'
export const useSceneManagerStore = defineStore('sceneManager', () => {

    const activeRoom = ref<Room>()
    const sceneList = ref<Room[]>([])
    const createLocations = (sceneId: string, numberOfEnemies = 1, levelName?: string) => {
        const locationList = locations.map((locationData) => {

            const locationClass = new Room()
            const location = Object.assign(locationClass, locationData)
            sceneList.value.push(location)
            setRoom(location)
            return location

        })
    }

    const changeActiveRoom = (roomX: number, roomY: number) => {
        const { player } = usePlayer()
        const { updateGameState } = useGameStateManager()
        const feedStore = useFeedStore()

        feedStore.resetTravelFeed()

        console.log('x', roomX, 'y', roomY);

        activeRoom.value = sceneList.value.find((room) => room.x === roomX && room.y === roomY)
        if (!activeRoom.value) {
            console.error('No Room found')
            return
        }
        // if player is not holding torch and room is dark stop him from entering
        if (activeRoom.value.isDark && player.value.offHand?.id !== 'torch') {
            feedStore.setTravelFeedItem('The room is completely dark. You need a lightsource to enter')
            return
        }

        feedStore.setActiveRoomObject(undefined)
        activeRoom.value = activeRoom.value

        // If Room is explored - monster defeated before - don't create another one
        if (activeRoom.value.isExplored) {
            return
        }

        // If Room is not explored and there is no monsters present - set Room as explored
        if (!activeRoom.value.monsterList.length) {
            activeRoom.value.isExplored = true
            return
        }

        createEnemyList(activeRoom.value.monsterList.map((monster) => monster.originId))
        updateGameState(EGameState.Battle)
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
        activeRoom.value = scene
    }

    const resetRoom = () => {
        activeRoom.value = undefined
        localforage.removeItem('activeRoom')
    }
    const resetRoomList = () => {
        sceneList.value = []
        localforage.removeItem('exploredSceneList')
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
        await localforage.setItem('savedSceneList', JSON.stringify(sceneList.value))
    }
    const loadScene = async () => {
        // load and save sceneList.value
        const sceneListData = JSON.parse((await localforage.getItem('savedSceneList')) as string)

        if (!sceneListData) {
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

            if (location.name === 'Burned down farm') {
                location.image = 'images/burnedDownFarm.jpeg'
            }

            return location
        })


        console.log(sceneList.value);


        // load scene
        interface payload {
            currentRoom: {
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

        changeActiveRoom(savedSceneData.currentRoom.x, savedSceneData.currentRoom.y)

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
        activeRoom,
        sceneList,
        createLocations,
        setRoom,
        resetRoom,
        resetRoomList,
        saveScene,
        loadScene,
        changeActiveRoom,
    }


})
