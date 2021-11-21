import { reactive, toRefs } from 'vue'
import localforage from 'localforage'
import { iPlayer } from '@/interfaces/Player'
import { PlayerModel } from '@/assets/models/playerModel'
import { iMonster } from '@/interfaces/Monster'
const state = reactive({
    player: new PlayerModel(
        'Charname',
        'dwarf',
        '',
        {
            hp: 0,
            melee: 0,
            ranged: 0,
            strength: 0,
            speed: 0,
            dexterity: 0,
            inteligence: 0,
            initiative: 0,
            attacks: 0,
            willPower: 0,
            charisma: 0,
            thoughtness: 0,
        },
        {
            head: {
                name: 'Head',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            rightArm: {
                name: 'Right arm',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            leftArm: {
                name: 'Left arm',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            torso: {
                name: 'Torso',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            rightLeg: {
                name: 'Right leg',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
            leftLeg: {
                name: 'Left leg',
                armor: {
                    armorPoints: 0,
                    item: null,
                },
            },
        },
        null,
        '',
        [],
        true,
        true
    ),
})

export const usePlayer = () => {
    const setPlayer = (payload: iPlayer) => {
        Object.assign(state.player, payload)
        localforage.setItem('player', JSON.stringify(payload))
        console.log(state.player)
    }
    const attack = (enemy: iMonster) => {
        return state.player.attack(enemy)
    }

    const playerTakeDamage = (damage: number) => {
        state.player.stats.hp -= damage
    }

    const createPlayer = (payload: iPlayer) => {
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

    const getPlayer = () => state.player

    return {
        ...toRefs(state),
        setPlayer,
        getPlayer,
        createPlayer,
        fetchPlayer,
        attack,
        playerTakeDamage,
    }
}
