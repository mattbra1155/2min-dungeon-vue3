import { MonsterModel } from '@/assets/models/monsterModel'
import { Room } from '@/assets/models/RoomModel'
import { monsterGenerator } from '@/App.vue'
import { EGameState } from '@/enums/EGameState'
import { useFeedStore } from '@/stores/useFeed'
import { IPlayer } from '@/interfaces/IPlayer'
import { usePlayerStore } from '@/stores/usePlayer'
import { useGameStateStore } from '@/stores/useGameStateManager'

class Scene {
    constructor(
        public id: string = '0',
        public name: string = '',
        public entityList: Array<IPlayer | MonsterModel> = [],
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

    // changeCurrentRoom(roomId: string) {
    //     const playerStore = usePlayerStore()
    //     const gameStateStore = useGameStateStore()
    //     const feedStore = useFeedStore()
    //     if (!playerStore.player) {
    //         return
    //     }
    //     feedStore.resetTravelFeed()

    //     const currentRoom = this.roomList.find((room) => room.id === roomId.toString())
    //     if (!currentRoom) {
    //         console.error('No Room found')
    //         return
    //     }
    //     // if player is not holding torch and room is dark stop him from entering
    //     if (currentRoom.isDark && playerStore.player.offHand?.id !== 'torch') {
    //         feedStore.setTravelFeedItem('The room is completely dark. You need a lightsource to enter')
    //         return
    //     }

    //     feedStore.setActiveRoomObject(undefined)
    //     this.currentRoom = currentRoom

    //     // If Room is explored - monster defeated before - don't create another one
    //     if (this.currentRoom.isExplored) {
    //         return
    //     }

    //     // If Room is not explored and there is no monsters present - set Room as explored
    //     if (!this.currentRoom.monsterList.length) {
    //         this.currentRoom.isExplored = true
    //         return
    //     }

    //     this.createEnemyList(this.currentRoom.monsterList.map((monster) => monster.originId))
    //     gameStateStore.updateGameState(EGameState.Battle)
    // }

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
}

export { Scene }
