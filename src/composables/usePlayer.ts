import { reactive, toRefs } from 'vue'
import localforage from 'localforage'
import { iPlayer } from '@/interfaces/Player'
import { iMonster } from '@/interfaces/Monster'

interface iPlayerState {
    player: iPlayer | null
    targetToAttack: iMonster | null
}
const state: iPlayerState = reactive({
    player: null,
    targetToAttack: null,
})

export const usePlayer = () => {
    const setPlayer = (payload: iPlayer) => {
        Object.assign(state.player, payload)
        localforage.setItem('player', JSON.stringify(payload))
        console.log(state.player)
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
            if (!result) {
                return null
            } else {
                const player: iPlayer = JSON.parse(result)
                return player
            }
        } catch (err) {
            console.log(err)
        }
    }

    const setTargetToAttack = (enemy: iMonster) => {
        state.targetToAttack = enemy || null
    }

    const getPlayer = () => state.player

    return {
        ...toRefs(state),
        setPlayer,
        getPlayer,
        createPlayer,
        fetchPlayer,
        takeDamage,
        setTargetToAttack,
    }
}
