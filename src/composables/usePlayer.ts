import { reactive, toRefs } from 'vue'
import localforage from 'localforage'
import { IPlayer } from '@/interfaces/IPlayer'
import { bodyPartsModel } from '@/assets/models/bodyPartsModel'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'
import { IWeapon } from '@/interfaces/IItem'
import { Weapon } from '@/assets/models/itemsModel'
const { head, leftArm, rightArm, torso, leftLeg, rightLeg } = bodyPartsModel

const playerModel: IPlayer = {
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
}

interface iPlayerState {
    player: IPlayer
    initPlayer: IPlayer
}
const state: iPlayerState = reactive({
    initPlayer: {
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
        await storePlayerModel()
        state.player = payload

        await localforage.setItem('player', JSON.stringify(payload))
        return state.player
    }

    const createPlayer = (payload: IPlayer | null) => {
        if (payload) {
            state.player = Object.assign(state.player, payload)
            state.player.isAlive = true
            const weapon = new ItemGenerator().createItem(EItemCategory.Weapon)
            if (weapon instanceof Weapon) {
                state.player.weapon = weapon
            }
            localforage.setItem('player', JSON.stringify(state.player))
        }
    }

    const storePlayerModel = async () => {
        try {
            const result = await localforage.setItem('initPlayer', playerModel)
            return result
        } catch (error: any) {
            throw Error(error)
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

    const resetPlayer = async () => {
        state.player = (await localforage.getItem('initPlayer')) as IPlayer
    }

    const deadPlayer = () => {
        state.player.isAlive = false
        resetPlayer()
    }

    return {
        ...toRefs(state),
        setPlayer,
        createPlayer,
        fetchPlayer,
        deadPlayer,
        resetPlayer,
    }
}
