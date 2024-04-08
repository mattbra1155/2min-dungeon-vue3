import { MonsterModel } from '@/assets/models/monsterModel'
import { IScene } from '@/interfaces/IScene'
import { Room } from '@/assets/models/RoomModel'
import { PlayerModel } from './playerModel'
import locations from '@/assets/json/locations.json'
import { monsterGenerator } from '@/App.vue'
import { EGameState } from '@/enums/EGameState'
import { useGameStateManager } from '@/composables/useGameStateManager'
import roomObjects from '@/assets/json/roomObjects.json'
import { RoomObject } from './RoomObjectModel'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'
import { useFeedStore } from '@/stores/useFeed'
import { usePlayer } from '@/composables/usePlayer'

class Scene implements IScene {
    constructor(
        public id: string = '0',
        public name: string = '',
        public entityList: Array<PlayerModel | MonsterModel> = [],
        public currentRoom: Room | undefined = undefined,
        public roomList: Room[] = [],
        public description: string = '',
        public links: number[] = []
    ) {
        this.id = id
        this.name = name
        this.entityList = entityList
        this.currentRoom = currentRoom
        this.roomList = roomList
        this.description = description
        this.links = links
    }

    changeCurrentRoom(roomId: string) {
        const { player } = usePlayer()
        const { updateGameState } = useGameStateManager()
        const feedStore = useFeedStore()

        feedStore.resetFeed()

        const currentRoom = this.roomList.find((room) => room.id === roomId.toString())
        if (!currentRoom) {
            console.error('No Room found')
            return
        }
        // if player is not holding torch and room is dark stop him from entering
        if (currentRoom.isDark && player.value.offHand?.id !== 'torch') {
            feedStore.setTravelFeedItem('The room is completely dark. You need a lightsource to enter')
            return
        }

        feedStore.setActiveRoomObject(null)
        this.currentRoom = currentRoom

        // If Room is explored - monster defeated before - don't create another one
        if (this.currentRoom.isExplored) {
            return
        }

        // If Room is not explored and there is no monsters present - set Room as explored
        if (!this.currentRoom.monsterList.length) {
            this.currentRoom.isExplored = true
            return
        }

        this.createEnemyList(this.currentRoom.monsterList.map((monster) => monster.originId))
        updateGameState(EGameState.Battle)
    }

    createMonster = (monsterId?: string) => {
        const monster = monsterGenerator.create(monsterId)
        return monster
    }

    createEnemyList = (enemiesToCreate: string[]) => {
        const enemyList: MonsterModel[] = []
        enemiesToCreate.forEach((monsterId: string) => {
            const enemy = this.createMonster(monsterId)
            enemyList.push(enemy)
        })
        return enemyList
    }

    fetchSceneDetails(id: string): Scene | undefined {
        const sceneDetails = locations.find((scene) => scene.id === id.toString())

        if (!sceneDetails) {
            console.error('No scene details fetched')
            return
        }
        this.id = sceneDetails.id
        this.name = sceneDetails.name

        sceneDetails?.roomList?.forEach((roomData) => {
            const monsterList = this.createEnemyList(roomData.entityList)
            const createObjects = () => {
                const list: any = []
                roomData.objects.forEach((object) => {
                    const objectData = roomObjects.containers.find((item) => item.type === object.type)
                    if (!objectData) {
                        console.error('no roomObject container found')
                        return
                    }
                    const getItems = () => {
                        const items = objectData.items.map((item) => {
                            const itemGenerator = new ItemGenerator()
                            const itemCategory = Object.values(EItemCategory).find((eItem) => eItem === item)
                            return itemGenerator.createItem(itemCategory!)
                        })
                        return items
                    }

                    const createdObject = new RoomObject(
                        `container-${crypto.randomUUID()}`,
                        objectData.type,
                        objectData.image,
                        objectData.imageSearched,
                        objectData.name,
                        objectData.description,
                        getItems(),
                        false,
                        object.isLocked
                    )

                    list.push(createdObject)
                })
                return list
            }

            this.roomList.push(
                new Room(
                    roomData.id,
                    roomData.name,
                    roomData.image,
                    roomData.description,
                    monsterList,
                    createObjects(),
                    roomData.lootList,
                    roomData.exits,
                    false,
                    false,
                    roomData.isDark
                )
            )
        })
        return this
    }
}

export { Scene }
