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
                            v-model="race"
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
                                v-model="playerObject.profession"
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
                    <button type="button" @click="rollStats" id="generateStatsButton" class="button action__button">
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
                <div class="m-form__column">
                    <h2 class="o-characterGenerator__header">Inventory</h2>
                    <div id="charInventory" class="inventory"></div>
                </div>
            </div>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <h2 class="o-characterGenerator__header">Weapon</h2>
                    <div id="charWeapon" class="weapon"></div>
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

<script lang="ts">
import { PlayerModel } from '@/assets/models/playerModel'
import { usePlayer } from '@/composables/usePlayer'
import { diceRollK2, diceRollK3, diceRollK10 } from '@/assets/scripts/diceRoll'

import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { IPlayer } from '@/interfaces/IPlayer'
import { stats } from '@/assets/models/statsModel'

export default defineComponent({
    setup() {
        const router = useRouter()
        const { player, createPlayer } = usePlayer()

        const playerObject = player

        const rollStats = () => {
            console.log(playerObject)
            if (playerObject && playerObject.value?.race === 'human') {
                Object.assign(playerObject.value?.stats, {
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
                })
            }

            if (playerObject.value && playerObject.value.race === 'dwarf') {
                Object.assign(playerObject.value.stats, {
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
                })
            }
        }
        const savePlayer = () => {
            if (playerObject.value) {
                createPlayer(playerObject.value)
                router.push({ name: 'home' })
            }
        }
        return {
            playerObject,
            rollStats,
            savePlayer,
            diceRollK2,
            diceRollK3,
            diceRollK10,
            defineComponent,
        }
    },
})
</script>
