import { reactive, toRefs } from 'vue'
import localforage from 'localforage'
import { iPlayer } from '@/interfaces/Player'
import { iMonster } from '@/interfaces/Monster'
import { PlayerModel } from '@/assets/models/playerModel'

interface iPlayerState {
    player: iPlayer | null
    targetToAttack: iMonster | null
}
const state: iPlayerState = reactive({
    player: null,
    targetToAttack: null,
})

export const usePlayer = () => {
    const setPlayer = async (payload: iPlayer) => {
        state.player = payload
        await localforage.setItem('player', JSON.stringify(payload))
    }

    const takeDamage = (damage: number) => {
        if (state.player) {
            state.player.stats.hp -= damage
        }
    }

    const createPlayer = (payload: iPlayer) => {
        state.player = Object.assign(payload)
        console.log(state.player)
        localforage.setItem('player', JSON.stringify(payload))
    }

    const fetchPlayer = async () => {
        try {
            const result: string | null = await localforage.getItem('player')
            if (result) {
                let player: PlayerModel = JSON.parse(result)
                player = Object.assign(new PlayerModel(), player)
                return player
            }
        } catch (error: any) {
            throw Error(error)
        }
    }

    const setTargetToAttack = (enemy: iMonster | null) => {
        state.targetToAttack = enemy || null
    }

    return {
        ...toRefs(state),
        setPlayer,
        createPlayer,
        fetchPlayer,
        takeDamage,
        setTargetToAttack,
    }
}
