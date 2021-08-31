import { reactive, readonly } from 'vue'
import localforage from 'localforage'
import { iPlayer } from '@/interfaces/iPlayer'
import { PlayerModel } from '@/assets/models/playerModel'
import { iMonster } from '@/interfaces/iMonster'
const state = reactive({
    player: <iPlayer>{},
})

export default function usePlayer() {
    const setPlayer = (payload: iPlayer) => {
        Object.assign(state.player, payload)
        console.log(state.player)
    }
    const attack = (enemy: iMonster) => {
        console.log(enemy)
    }

    const takeDamage = (damage: number) => {
        state.player.stats.hp -= damage
    }

    const createPlayer = (payload: iPlayer) => {
        setPlayer(payload)
        localforage.setItem('player', JSON.stringify(payload))
        fetchPlayer()
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

    const getPlayer = () => state.player

    return {
        state: readonly(state),
        setPlayer,
        getPlayer,
        createPlayer,
        fetchPlayer,
        attack,
        takeDamage,
    }
}
