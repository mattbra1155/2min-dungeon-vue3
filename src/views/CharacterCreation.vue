<script setup lang="ts">
import { usePlayer } from '@/composables/usePlayer'
import { diceRollK2, diceRollK3, diceRollK10 } from '@/assets/scripts/diceRoll'
import { useRouter } from 'vue-router'
import { EGameState } from '@/enums/EGameState'
import { useGameStateManager } from '@/composables/useGameStateManager'
import { PlayerModel } from '@/assets/models/playerModel'
import { ref } from 'vue'
import { ItemGenerator } from '@/assets/generators/itemGenerator'
import { EItemCategory } from '@/enums/ItemCategory'
import professions from '@/assets/json/professions.json'
import { EStats } from '@/enums/EStats'
import { IProfessionPayload } from '@/interfaces/IProfession'
import { Profession } from '@/assets/models/professionModel'
const router = useRouter()
const { initPlayer, createPlayer, resetPlayer } = usePlayer()
const { updateGameState } = useGameStateManager()
const playerObject = ref<PlayerModel>(initPlayer.value)
const selectedProfession = ref<IProfessionPayload>()
console.log(playerObject.value.stats)
const rollStats = () => {
    if (!playerObject.value) {
        throw new Error('No Player object to roll stats')
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
            willPower: diceRollK10() * 2 + 20,
            charisma: diceRollK10() * 2 + 2,
        }

        Object.entries(updated).forEach(([key, stat]) => {
            const statName: EStats = Object.values(EStats).find((item) => item === key) as EStats
            if (!statName) return
            playerObject.value.stats[statName].value = stat
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
            willPower: diceRollK10() * 2 + 40,
            charisma: diceRollK10() * 2 + 1,
        }
        Object.entries(updated).forEach(([key, stat]) => {
            const statName: EStats = Object.values(EStats).find((item) => item === key) as EStats
            if (!statName) return
            playerObject.value.stats[statName].value = stat
        })
    }
}

const selectProfession = (profession: IProfessionPayload) => {
    playerObject.value.profession = undefined
    playerObject.value.profession = new Profession('123', profession.id, profession.description)
    Object.entries(profession.statsDevelopment).forEach(([key, value]) => {
        const statName = Object.values(EStats).find((stat) => stat === key)
        if (!statName) {
            throw new Error('No statName')
        }
        if (key && statName === key && playerObject.value.profession) {
            playerObject.value.profession.statsDevelopment[key].value = value
            console.log(playerObject.value.profession.statsDevelopment)
        }
    })
    return playerObject.value.profession
}

const createInventoryItems = () => {
    const weapon = new ItemGenerator().createItem(EItemCategory.Weapon)
    const armor = new ItemGenerator().createItem(EItemCategory.Armor)
    playerObject.value.inventory.addItem(weapon, playerObject.value.id)
    playerObject.value.inventory.addItem(armor, playerObject.value.id)
}
const savePlayer = async () => {
    if (playerObject.value) {
        await resetPlayer()
        createPlayer(playerObject.value)
        updateGameState(EGameState.Battle)
        router.push({ name: 'home' })
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
                    <input type="text" name="playerName" v-model="playerObject.name" />
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
            <!-- <div class="m-form__row o-characterGenerator__row">
                <h2 class="o-characterGenerator__header">Class</h2>
                <div class="m-form__column">
                    <div class="m-form__item">
                        <label for="class">
                            Warrior
                            <input
                                type="radio"
                                name="class"
                                value="warrior"
                                class="item__input"
                                v-model="playerObject."
                            />
                        </label>
                    </div>
                    <div class="m-form__item">
                        <label for="class">
                            Mage
                            <input
                                type="radio"
                                name="class"
                                value="mage"
                                class="item__input"
                                v-model="playerObject.profession"
                            />
                        </label>
                    </div>
                </div>
            </div> -->
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__row">
                    <h2 class="o-characterGenerator__header">Profession</h2>
                    <form class="m-form__column">
                        <div v-for="profession in professions.warrior" :key="profession.id" class="m-form__item">
                            <label :for="profession.name">
                                {{ profession.name }}
                                <input
                                    type="radio"
                                    class="item__input"
                                    name="profession"
                                    :value="profession"
                                    @change="selectProfession(profession as IProfessionPayload)"
                                />
                            </label>
                            {{ selectedProfession }}
                        </div>
                    </form>
                </div>
            </div>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <label for="bio" class="o-characterGenerator__header">Bio</label>
                    <textarea
                        type="text"
                        name="bio"
                        id="characterBio"
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
                        @click="rollStats()"
                        @click.once="createInventoryItems()"
                        id="generateStatsButton"
                        class="button action__button"
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
                            <p class="a-text">{{ value.value }}</p>
                        </div>
                    </div>
                </div>
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
                            {{
                                item.prefix.modifier !== 0
                                    ? Math.sign(item.prefix.modifier)
                                        ? `+${item.prefix.modifier}`
                                        : `${item.prefix.modifier}`
                                    : ''
                            }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <button type="submit" id="createPlayerButton" class="button action__button">Create</button>
                </div>
            </div>
        </form>
    </div>
</template>
