import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSceneManagerStore } from './useSceneManager'
import { diceRollK100 } from '@/assets/scripts/diceRoll'
import { EGameState } from '@/enums/EGameState'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { useTurn } from '@/composables/useTurn'
interface coords {
    x: number
    y: number
}

export const useRandomEncounters = defineStore('randomEncounters', () => {
    const sceneManager = useSceneManagerStore()
    const { updateGameState } = useGameStateManager()
    const { setMonsterList } = useTurn()

    const roll = ref<number>()
    const isBattle = ref<boolean>(false)


    const rollEncounter = (locationType: string) => {

        roll.value = undefined
        isBattle.value = false

        roll.value = diceRollK100()
        const threshold = {
            road: 5,
            grassland: 20,
            fields: 15,
            hinterlands: 30,
            forest: 35,
            darkForest: 40
        }
        console.log(isBattle.value);


        if (locationType === 'road') {
            if (roll.value <= threshold.road) {
                isBattle.value = true
            }
        }
        if (locationType === 'grassland') {
            if (roll.value <= threshold.grassland) {
                isBattle.value = true
            }
        }
        if (locationType === 'fields') {
            if (roll.value <= threshold.fields) {
                isBattle.value = true
            }
        }
        if (locationType === 'forest') {
            if (roll.value <= threshold.forest) {
                isBattle.value = true
            }
        }
        if (locationType === 'hinterlands') {
            if (roll.value <= threshold.hinterlands) {
                isBattle.value = true
            }
        }
        if (locationType === 'dark_forest') {
            if (roll.value <= threshold.darkForest) {
                isBattle.value = true
            }
        }

        console.log(locationType, roll.value, roll.value <= threshold.road, isBattle.value);



        if (!isBattle.value) {
            return false
        }

        const monsterList = sceneManager.createEnemyList(['lesserGoblin'])
        updateGameState(EGameState.Battle)
        setMonsterList(monsterList)
    }
    return {
        roll,
        isBattle,
        rollEncounter,
    }
})
