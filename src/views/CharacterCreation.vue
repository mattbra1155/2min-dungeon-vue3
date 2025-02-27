<script setup lang="ts">
import professions from '@/assets/json/professions.json'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ISkill } from '@/interfaces/ISkill'
import { IPlayer } from '@/interfaces/IPlayer'
import { IProfessionPayload } from '@/interfaces/IProfession'
import { EGameState } from '@/enums/EGameState'
import { EStats } from '@/enums/EStats'
import { Profession } from '@/assets/models/professionModel'
import { usePlayerStore } from '@/stores/usePlayer'
import { useGameStateStore } from '@/stores/useGameStateManager'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { skills as skillList } from '@/assets/json/skills'
import { diceRollK2, diceRollK3, diceRollK10, diceRollK6 } from '@/helpers/diceRoll'
import { PlayerModel } from '@/assets/models/playerModel'

const router = useRouter()
const playerStore = usePlayerStore()
const { updateGameState } = useGameStateStore()
const playerObject = ref<IPlayer>(new PlayerModel())

const getProfessionSkillName = (id: string) => {
    const skill = skillList.find((skillItem: ISkill) => skillItem.id === id)
    if (skill) {
        return skill.name
    }
}
const rollStats = () => {
    if (!playerObject.value) {
        return
    }
    if (playerObject.value.race === 'human') {
        const updated = {
            hp: diceRollK3() + 4,
            melee: diceRollK10() * 2 + 20,
            ranged: diceRollK10() * 2 + 20,
            dexterity: diceRollK10() + 20,
            strength: diceRollK3() + 1,
            thoughtness: diceRollK3() + 1,
            speed: diceRollK3() + 2,
            initiative: diceRollK10() * 2 + 20,
            attacks: 1,
            inteligence: diceRollK10() * 2 + 20,
            willpower: diceRollK10() * 2 + 20,
            charisma: diceRollK10() * 2 + 2,
        }

        Object.entries(updated).forEach(([key, stat]) => {
            if (!playerObject.value) {
                return
            }
            const statName: EStats = Object.values(EStats).find((item) => item === key) as EStats
            if (!statName) return
            playerObject.value.stats[statName] = stat
        })
    }
    if (playerObject.value.race === 'dwarf') {
        const updated = {
            hp: diceRollK3() + 5,
            melee: diceRollK10() * 2 + 30,
            ranged: diceRollK10() * 2 + 10,
            dexterity: diceRollK10() + 10,
            strength: diceRollK3() + 1,
            thoughtness: diceRollK3() + 2,
            speed: diceRollK2() + 2,
            initiative: diceRollK10() * 2 + 10,
            attacks: 1,
            inteligence: diceRollK10() * 2 + 20,
            willpower: diceRollK10() * 2 + 40,
            charisma: diceRollK10() * 2 + 1,
        }
        Object.entries(updated).forEach(([key, stat]) => {
            const statName: EStats = Object.values(EStats).find((item) => item === key) as EStats
            if (!statName) return
            playerObject.value.stats[statName] = stat
        })
    }
}

const selectProfession = (profession: IProfessionPayload) => {
    playerObject.value.profession = undefined
    playerObject.value.profession = new Profession(
        profession.id,
        profession.name,
        profession.description,
        profession.statsDevelopment,
        skillList
    )
    Object.entries(profession.statsDevelopment).forEach(([key, value]) => {
        const statName = Object.values(EStats).find((stat) => stat === key)
        if (!statName) {
            throw new Error('No statName')
        }
        if (key && statName === key && playerObject.value.profession) {
            playerObject.value.profession.statsDevelopment[key] = value
        }
    })

    const prefessionSkills: ISkill[] = []

    profession.skills.forEach((skill) => {
        const fff = skillList.find((skillId) => skillId.id === skill)
        if (fff) {
            prefessionSkills.push(fff)
        }
    })

    if (prefessionSkills) playerObject.value.skills = prefessionSkills

    // TEST of purchased advances - WORKING
    // Object.assign(playerObject.value.advancedStats, { hp: 110, melee: 313 })

    return playerObject.value.profession
}

const setEncumbranceMax = () => {
    playerObject.value.inventory.encumbrance.max = playerObject.value.stats.strength * 100
}

const createInventoryItems = () => {
    playerObject.value.inventory.inventory = []
    const itemList = []
    const weapon = new ItemGenerator().createItemById('sword')
    const armor = new ItemGenerator().createItemById('jacket')
    const armor1 = new ItemGenerator().createItemById('sleeves')
    const potion = new ItemGenerator().createItemById('health')
    const utility = new ItemGenerator().createItemById('torch')
    const material = new ItemGenerator().createItemById('metal scrap')
    const material2 = new ItemGenerator().createItemById('metal scrap')
    // if (!weapon || !armor || !potion || !utility || !material || !armor1) {
    //     console.error('cant create item')
    //     return
    // }
    itemList.push(weapon, armor, potion, utility, material, armor1, material2)

    itemList.forEach((item) => {
        if (!item) {
            console.error('cant create item')
            return
        }
        const { status, message } = playerObject.value.inventory.addItem(item, playerObject.value.id)
        if (!status) {
            throw Error(message)
        }
        console.log(message)
    })
}

const rollForGold = () => {
    const sum = diceRollK6() * 2
    playerObject.value.inventory.gold = sum
}

const savePlayer = async () => {
    if (playerObject.value) {
        playerStore.createPlayer(playerObject.value)
        updateGameState(EGameState.StartGame)
    }
}
</script>

<template>
    <div id="characterGenerator" class="o-characterGenerator" @submit.prevent="savePlayer">
        <form class="m-form o-characterGenerator__sheet">
            <h2 class="o-characterGenerator__header">Character creation sheet</h2>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <label for="playerName" class="header">Name</label>
                    <input type="text" name="playerName" class="a-input" v-model="playerObject.name" />
                </div>
            </div>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <h2 class="o-characterGenerator__header">Race</h2>
                    <div class="o-characterGenerator__item">
                        <label for="human">Human</label>
                        <input
                            type="radio"
                            name="playerRace"
                            value="human"
                            class="item__input"
                            checked="true"
                            v-model="playerObject.race"
                        />
                    </div>
                    <div class="o-characterGenerator__item">
                        <label for="dwarf">Dwarf</label>
                        <input
                            type="radio"
                            name="playerRace"
                            value="dwarf"
                            class="item__input"
                            v-model="playerObject.race"
                        />
                    </div>
                </div>
                <div class="m-form__column">
                    <p class="a-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam labore debitis nam. Cupiditate
                        alias ad voluptatum quos aut, magnam ea totam culpa vero fuga. Adipisci asperiores quae sint
                        dicta. Repellendus?
                    </p>
                </div>
            </div>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <label for="bio" class="o-characterGenerator__header">Bio</label>
                    <textarea
                        type="text"
                        name="bio"
                        id="characterBio"
                        class="a-input a-input__textarea"
                        rows="5"
                        v-model="playerObject.description"
                    ></textarea>
                </div>
            </div>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <h2 class="o-characterGenerator__header">Stats</h2>
                    <button
                        type="button"
                        @click="rollStats(), rollForGold(), setEncumbranceMax(), createInventoryItems()"
                        id="generateStatsButton"
                        class="a-button action__button"
                    >
                        Roll dice
                    </button>
                    <div id="statList" class="o-characterGenerator__statList">
                        <div
                            v-for="(value, key, index) in playerObject.stats"
                            class="o-characterGenerator__statItem"
                            :key="index"
                        >
                            <p class="a-text">
                                {{ key }}
                            </p>
                            <p class="a-text">{{ value }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">Gold: {{ playerObject.inventory.gold }}</div>
                <div class="m-form__column">Encumbrance: {{ playerObject.inventory.encumbrance.max }} pts</div>
            </div>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <h2 class="o-characterGenerator__header">Inventory</h2>
                    <div
                        id="charInventory"
                        class="o-characterGenerator__inventory"
                        v-for="item in playerObject.inventory.inventory"
                        :key="item.id"
                    >
                        <div class="o-characterGenerator__inventory">
                            {{ item.name }}
                            <!-- TO DO MODIFIER NAME -->
                            <!-- {{
                                item.prefix.modifier !== 0
                                    ? Math.sign(item.prefix.modifier)
                                        ? `+${item.prefix.modifier}`
                                        : `${item.prefix.modifier}`
                                    : ''
                            }} -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__row">
                    <h2 class="o-characterGenerator__header">Profession</h2>
                    <form class="m-form__column">
                        <div
                            v-for="profession in professions.warrior"
                            :key="profession.id"
                            class="m-form__item m-form__item--column"
                        >
                            <label :for="profession.name">
                                {{ profession.name }}
                                <input
                                    type="radio"
                                    class="item__input"
                                    name="profession"
                                    :value="profession"
                                    @change="selectProfession(profession as unknown as IProfessionPayload)"
                                />
                            </label>
                            <div class="o-characterGenerator__statList">
                                <template v-for="[key, value] in Object.entries(profession.statsDevelopment)">
                                    <div v-if="value !== 0" :key="key" class="o-characterGenerator__statItem">
                                        <p class="a-text">
                                            {{ key }}
                                        </p>
                                        <p class="a-text">+{{ value }}</p>
                                    </div>
                                </template>
                            </div>
                            <div class="o-characterGenerator__skills">
                                <p><b>Skills:</b></p>
                                <br />
                                <div class="o-characterGenerator__skillList">
                                    <p v-for="skill in profession.skills" :key="skill" class="a-text">
                                        {{ getProfessionSkillName(skill) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <button type="submit" id="createPlayerButton" class="a-button action__button">Create</button>
                </div>
            </div>
        </form>
    </div>
</template>
