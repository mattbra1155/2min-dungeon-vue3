import { MonsterModel } from '@/assets/models/monsterModel'
import { IScene } from '@/interfaces/IScene'
import { Room, RoomExit } from '@/assets/models/RoomModel'
import { PlayerModel } from './playerModel'
import locations from '@/assets/json/locations.json'
import { monsterGenerator } from '@/App.vue'
import { EGameState } from '@/enums/EGameState'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { ERoomTypes } from '@/enums/ERoomTypes'
import roomObjects from '@/assets/json/roomObjects.json'
import { RoomObject } from './RoomObjectModel'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'
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
        const currentRoom = this.roomList.find((room) => room.id === roomId)

        if (!currentRoom) {
            console.error('No Room found')
            return
        }

        this.currentRoom = currentRoom
        console.log(this.currentRoom.isExplored)

        // If Room is explored - monster defeated before - don't create another one
        if (this.currentRoom.isExplored) {
            return
        }

        // If Room is not explored and there is no monsters present - set Room as explored
        if (!this.currentRoom.monsterList.length) {
            this.currentRoom.isExplored = true
            return
        }

        this.createEnemyList(this.currentRoom.monsterList.length)
        const { updateGameState } = useGameStateManager()
        updateGameState(EGameState.Battle)
    }

    createMonster = () => {
        const monster = monsterGenerator.create()
        return monster
    }

    createEnemyList = (enemiesToCreate: number) => {
        let createdEnemies = 0
        const enemyList = []
        while (createdEnemies < enemiesToCreate) {
            createdEnemies++
            const enemy = this.createMonster()
            // this.entityList.push(enemy)
            enemyList.push(enemy)
        }

        return enemyList
    }

    fetchSceneDetails(id: string): Scene | undefined {
        const sceneDetails = locations.find((scene) => scene.id === id)

        if (!sceneDetails) {
            console.error('No scene details fetched')
            return
        }
        this.id = sceneDetails.id
        this.name = sceneDetails.name
        // this.entityList = sceneDetails.entityList

        sceneDetails?.roomList?.forEach((roomData) => {
            // const monsterList = roomData.entityList.map((entity) => {
            //     const monster = new MonsterModel(entity)
            //     return monster
            // })

            const monsterList = this.createEnemyList(roomData.entityList.length)
            const createObjects = () => {
                const list: any = []
                roomData.objects.forEach((object) => {
                    const objectData = roomObjects.containers.find((item) => item.id === object)
                    if (!objectData) {
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
                        objectData.id,
                        objectData.image,
                        objectData.imageSearched,
                        objectData.name,
                        objectData.description,
                        getItems()
                    )

                    list.push(createdObject)
                })
                return list
            }

            if (roomData.type === ERoomTypes.Exit) {
                const roomExitData = roomData as unknown as RoomExit
                const roomExit = new RoomExit(
                    roomExitData.id,
                    roomExitData.name,
                    roomExitData.description,
                    monsterList,
                    createObjects(),
                    roomExitData.lootList,
                    roomExitData.exits,
                    roomExitData.type,
                    false,
                    false,
                    roomExitData.sceneLinks
                )
                this.roomList.push(roomExit)
            }

            this.roomList.push(
                new Room(
                    roomData.id,
                    roomData.name,
                    roomData.description,
                    monsterList,
                    createObjects(),
                    roomData.lootList,
                    roomData.exits,
                    false,
                    false
                )
            )
        })
        return this
    }
}

export { Scene }
