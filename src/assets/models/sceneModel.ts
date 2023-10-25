import { MonsterModel } from '@/assets/models/monsterModel'
import { IScene } from '@/interfaces/IScene'
import { Room } from './RoomModel'
import { PlayerModel } from './playerModel'
import locations from '@/assets/json/locations.json'
class Scene implements IScene {
    constructor(
        public id: number = 0,
        public name: string = '',
        public entityList: Array<PlayerModel | MonsterModel> = [],
        public currentRoomId: number | undefined = undefined,
        public roomList: Room[] = [],
        public description: string = '',
        public links: number[] = []
    ) {
        this.id = id
        this.name = name
        this.entityList = entityList
        this.currentRoomId = currentRoomId
        this.roomList = roomList
        this.description = description
        this.links = links
    }

    changeCurrentRoom(roomId: number) {
        this.currentRoomId = roomId
    }

    fetchSceneDetails(id: number): Scene | undefined {
        const sceneDetails = locations.find((scene) => scene.id === id)

        if (!sceneDetails) {
            console.error('No scene details fetched')
            return
        }
        this.id = sceneDetails.id
        this.name = sceneDetails.name
        this.entityList = sceneDetails.entityList

        sceneDetails.roomList.forEach((room) =>
            this.roomList.push(new Room(room.id, room.name, room.description, [], [], room.exits))
        )
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
