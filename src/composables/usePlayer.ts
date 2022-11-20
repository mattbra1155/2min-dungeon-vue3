import { reactive, toRefs } from 'vue'
import localforage from 'localforage'
import { IPlayer } from '@/interfaces/IPlayer'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
const { head, leftArm, rightArm, torso, leftLeg, rightLeg } = bodyPartsModel

interface iPlayerState {
    player: IPlayer,
    initPlayer: IPlayer | null,
}
const state: iPlayerState = reactive({
    player: {
        id: 0,
        name: 'Charname',
        race: 'dwarf',
        profession: '',
        stats: {
            hp: 0,
            melee: 0,
            ranged: 0,
            dexterity: 0,
            strength: 0,
            thoughtness: 0,
            speed: 0,
            initiative: 0,
            attacks: 0,
            inteligence: 0,
            willPower: 0,
            charisma: 0,
        },
        bodyParts: {
            head,
            leftArm,
            rightArm,
            torso,
            leftLeg,
            rightLeg,
        },
        weapon: null,
        description: '',
        inventory: [],
        isAlive: true,
        player: true,
    },
    initPlayer: null
})

export const usePlayer = () => {
    const setPlayer = async (payload: IPlayer) => {
        state.player = payload
        await localforage.setItem('player', JSON.stringify(payload))
        return state.player
    }

    const createPlayer = (payload: IPlayer | null) => {
        if (payload) {
            state.initPlayer = JSON.parse(JSON.stringify(state.player))
            state.player = Object.assign(payload)
            console.log(state.player)
            state.player.isAlive = true
            localforage.setItem('player', JSON.stringify(payload))
        }
    }

    const fetchPlayer = async () => {
        try {
            const result: string | null = await localforage.getItem('player')
            if (result) {
                const player: IPlayer = JSON.parse(result)
                return player
            } 
        } catch (error: any) {
            throw Error(error)
        }
    }

    const deadPlayer = () => {
        state.player.isAlive = false
        console.log(state);
        if (state.initPlayer) {
            state.player = state.initPlayer
        }
    }

    return {
        ...toRefs(state),
        setPlayer,
        createPlayer,
        fetchPlayer,
        deadPlayer,
    }
}