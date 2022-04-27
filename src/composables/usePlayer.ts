import { reactive, toRefs } from 'vue'
import localforage from 'localforage'
import { IPlayer } from '@/interfaces/IPlayer'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
const { head, leftArm, rightArm, torso, leftLeg, rightLeg } = bodyPartsModel

interface iPlayerState {
    player: IPlayer
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
})

export const usePlayer = () => {
    const setPlayer = async (payload: IPlayer) => {
        state.player = payload
        await localforage.setItem('player', JSON.stringify(payload))
    }

    const createPlayer = (payload: IPlayer | null) => {
        if (payload) {
            state.player = Object.assign(payload)
            console.log(state.player)
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

    return {
        ...toRefs(state),
        setPlayer,
        createPlayer,
        fetchPlayer,
    }
}