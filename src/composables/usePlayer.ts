import { reactive, readonly } from 'vue'
import localforage from 'localforage'
import { Player } from '@/interfaces/Player'
import { PlayerModel } from '@/assets/models/playerModel'
import { Monster } from '@/interfaces/Monster'
const state = reactive({
    player: <Player>{},
})

export default function usePlayer() {
    const setPlayer = (payload: Player) => {
        Object.assign(state.player, payload)
        console.log(state.player)
    }
    const attack = (enemy: Monster) => {
        console.log(enemy)
    }

    const takeDamage = (damage: number) => {
        state.player.stats.hp -= damage
    }

    const createPlayer = (payload: Player) => {
        setPlayer(payload)
        localforage.setItem('player', JSON.stringify(payload))
        fetchPlayer()
    }

    const fetchPlayer = async () => {
        try {
            const result: string | null = await localforage.getItem('player')
            if (result !== null) {
                const player: Player = JSON.parse(result)
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
