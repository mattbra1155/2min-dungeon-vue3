import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSceneManagerStore } from './useSceneManager'
import { diceRollK100 } from '@/helpers/diceRoll'
import { EGameState } from '@/enums/EGameState'
import { useWieghtedList } from '@/composables/useWieghtedList'
import { encounterList } from '@/assets/data/encounterList'
import { ELocationTypes } from '@/enums/ELocationTypes'
import { useGameStateStore } from './useGameStateManager'
import { useTurnStore } from '@/stores/useTurn'

export const useRandomEncounters = defineStore('randomEncounters', () => {
    const sceneManager = useSceneManagerStore()
    const gameStateStore = useGameStateStore()
    const turnStore = useTurnStore()

    const roll = ref<number>()
    const isBattle = ref<boolean>(false)
    const numberOfEnemies = ref<number>(0)

    const rollEncounter = (locationType: ELocationTypes) => {
        roll.value = undefined
        isBattle.value = false

        roll.value = diceRollK100()
        const threshold = {
            road: 5,
            fields: 15,
            grassland: 20,
            hinterlands: 25,
            forest: 30,
            darkForest: 80,
        }
        console.log(roll.value)

        let monsters: string[] = []

        console.log(locationType)

        if (locationType === 'road') {
            // monsters = ['lesserGoblin']
            if (roll.value <= threshold.road) {
                isBattle.value = true
            }
        }
        if (locationType === 'grassland') {
            // monsters = ['lesserGoblin', 'goblin']
            if (roll.value <= threshold.grassland) {
                isBattle.value = true
            }
        }
        if (locationType === 'fields') {
            // monsters = ['lesserGoblin', 'goblin']
            if (roll.value <= threshold.fields) {
                isBattle.value = true
            }
        }
        if (locationType === 'forest') {
            // monsters = ['lesserGoblin', 'goblin', 'ork', 'skeleton']
            if (roll.value <= threshold.forest) {
                isBattle.value = true
            }
        }
        if (locationType === 'hinterlands') {
            monsters = ['goblin', 'ork', 'ogre']
            if (roll.value <= threshold.hinterlands) {
                isBattle.value = true
            }
        }
        if (locationType === 'dark_forest') {
            monsters = ['ork', 'ogr', 'liche']
            if (roll.value <= threshold.darkForest) {
                isBattle.value = true
            }
        }

        if (!isBattle.value) {
            return false
        }

        const list: string[] = []

        const { getWeightedItem } = useWieghtedList()

        const weightedItem = getWeightedItem(encounterList[locationType])
        list.push(weightedItem)

        sceneManager.createEnemyList(list)
        gameStateStore.updateGameState(EGameState.Battle)
    }
    return {
        roll,
        isBattle,
        rollEncounter,
    }
})
