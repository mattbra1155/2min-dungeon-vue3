import { MonsterModel } from '@/assets/models/monsterModel'
import { IScene } from '@/interfaces/IScene'
import { IRoomExit, Room, RoomExit } from './RoomModel'
import { PlayerModel } from './playerModel'
import locations from '@/assets/json/locations.json'
import { monsterGenerator } from '@/App.vue'
import { EGameState } from '@/enums/EGameState'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { ERoomTypes } from '@/enums/ERoomTypes'

class Scene implements IScene {
    constructor(
        public id: number = 0,
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

    changeCurrentRoom(room: Room) {
        this.currentRoom = room

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
        console.log(monster)

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

    fetchSceneDetails(id?: number): Scene | undefined {
        const sceneDetails = locations.find((scene) => scene.id === id)

        if (!sceneDetails) {
            console.error('No scene details fetched')
            return
        }
        this.id = sceneDetails.id
        this.name = sceneDetails.name
        this.entityList = sceneDetails.entityList

        sceneDetails.roomList.forEach((room) => {
            // const monsterList = room.entityList.map((entity) => {
            //     const monster = new MonsterModel(entity)
            //     return monster
            // })

            const monsterList = this.createEnemyList(room.entityList.length)

            if (room.type === ERoomTypes.Exit) {
                const roomExitData = room as unknown as RoomExit

                console.log('roomExitData', roomExitData)

                const roomExit = new RoomExit(
                    roomExitData.id,
                    roomExitData.name,
                    roomExitData.description,
                    monsterList,
                    roomExitData.lootList,
                    roomExitData.exits,
                    roomExitData.type,
                    false,
                    roomExitData.sceneLinks
                )
                this.roomList.push(roomExit)
            }

            this.roomList.push(new Room(room.id, room.name, room.description, monsterList, room.lootList, room.exits))
        })

        console.log(sceneDetails)
        return this
    }

    // creatRandomRoomList(amount: number) {
    //     let currentAmount = 0
    //     const entryRoom = new Room('', 'entry', 'Room desc', [], [], [-1, -1, 1, 2])

    //     console.log(entryRoom.exits)

    //     while (currentAmount < amount) {
    //         currentAmount++
    //         const exitAmount = entryRoom.exits.length

    //         const room = Math.floor(Math.random() * exitAmount)

    //         console.log(room)
    //     }
    // }
}

export { Scene }
