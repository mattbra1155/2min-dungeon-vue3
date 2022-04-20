import { reactive, toRefs } from 'vue'
import localforage from 'localforage'
import { IPlayer } from '@/interfaces/IPlayer'
import { IMonster } from '@/interfaces/IMonster'
import { PlayerModel } from '@/assets/models/playerModel'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { useAttack } from './useAttack'

const { head, leftArm, rightArm, torso, leftLeg, rightLeg } = bodyPartsModel
const { attack } = useAttack()

interface iPlayerState {
    player: IPlayer
    targetToAttack: IMonster | null
}
const state: iPlayerState = reactive({
    player: {
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
    targetToAttack: null,
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
                let player: PlayerModel = JSON.parse(result)
                player = Object.assign(new PlayerModel(), player)
                return player
            }
        } catch (error: any) {
            throw Error(error)
        }
    }

    const attackTarget = (enemy: IMonster) => {
        attack(state.player, enemy)
    }

    const setTargetToAttack = (enemy: IMonster | null) => {
        state.targetToAttack = enemy || null
    }

    return {
        ...toRefs(state),
        setPlayer,
        createPlayer,
        fetchPlayer,
        setTargetToAttack,
        attackTarget,
    }
}
