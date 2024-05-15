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
    const numberOfEnemies = ref<number>(0)

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
        console.log(roll.value);

        let monsters: string[] = []

        if (locationType === 'road') {
            monsters = ['lesserGoblin']
            if (roll.value <= threshold.road) {
                isBattle.value = true
            }
        }
        if (locationType === 'grassland') {
            monsters = ['lesserGoblin', 'goblin']
            if (roll.value <= threshold.grassland) {
                isBattle.value = true
            }
        }
        if (locationType === 'fields') {
            monsters = ['lesserGoblin', 'goblin']
            if (roll.value <= threshold.fields) {
                isBattle.value = true
            }
        }
        if (locationType === 'forest') {
            monsters = ['lesserGoblin', 'goblin', 'ork', 'skeleton']
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
            monsters = ['ork', 'ogre', 'liche']
            if (roll.value <= threshold.darkForest) {
                isBattle.value = true
            }
        }

        if (!isBattle.value) {
            return false
        }

        const list: string[] = []


        for (let x = 0; x <= numberOfEnemies.value; x++) {
            const index = Math.floor(Math.random() * monsters.length)
            list.push(monsters[index])

        }
        const monsterList = sceneManager.createEnemyList(list)
        updateGameState(EGameState.Battle)
        setMonsterList(monsterList)
    }
    return {
        roll,
        isBattle,
        rollEncounter,
    }
})
