import { reactive, readonly } from 'vue'
import localforage from 'localforage'
import { Player } from '@/interfaces/Player'
import { Monster } from '@/interfaces/Monster'
const state = reactive({
    player: <Player>{},
})

export default function usePlayer() {
    const setPlayer = (payload: Player) => {
        state.player = payload
    }
    const attack = (enemy: Monster) => {}

    const takeDamage = (damage: number) => {
        state.player.hp -= damage
    }

    const createPlayer = (payload: Player) => {
        setPlayer(payload)
        localforage.setItem('player', payload)
    }

    const fetchPlayer = async () => {
        try {
            const player = await localforage.getItem('player')

            return player
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
