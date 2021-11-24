import { reactive, toRefs } from 'vue'
import localforage from 'localforage'
import { iPlayer } from '@/interfaces/Player'
import { PlayerModel } from '@/assets/models/playerModel'
import { iMonster } from '@/interfaces/Monster'
const state = reactive({
    player: <iPlayer>{},
    targetToAttack: <iMonster>{},
})

export const usePlayer = () => {
    const setPlayer = (payload: iPlayer) => {
        Object.assign(state.player, payload)
        localforage.setItem('player', JSON.stringify(payload))
        console.log(state.player)
    }

    const takeDamage = (damage: number) => {
        state.player.stats.hp -= damage
    }

    const createPlayer = (payload: iPlayer) => {
        state.player = Object.assign(payload)
        console.log(state.player)
        localforage.setItem('player', JSON.stringify(payload))
    }

    const fetchPlayer = async () => {
        try {
            const result: string | null = await localforage.getItem('player')
            if (result !== null) {
                const player: iPlayer = JSON.parse(result)
                return player
            }
        } catch (err) {
            console.log(err)
        }
    }

    const setTargetToAttack = (enemy: iMonster) => {
        state.targetToAttack = enemy
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
