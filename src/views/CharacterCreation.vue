<template>
    <div id="characterGenerator" class="o-characterGenerator" @submit.prevent="savePlayer">
        <form class="m-form o-characterGenerator__sheet">
            <h2 class="o-characterGenerator__header">Character creation sheet</h2>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <label for="playerName" class="header">Name</label>
                    <input type="text" name="playerName" v-model="player.name" />
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
                            v-model="player.race"
                        />
                    </div>
                    <div class="o-characterGenerator__item">
                        <label for="dwarf">Dwarf</label>
                        <input type="radio" name="playerRace" value="dwarf" class="item__input" v-model="player.race" />
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
                                v-model="player.profession"
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
                                v-model="player.profession"
                            />
                        </label>
                    </div>
                </div>
            </div>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <label for="bio" class="o-characterGenerator__header">Bio</label>
                    <textarea type="text" name="bio" id="characterBio" rows="5" v-model="player.description"></textarea>
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
                            v-for="(value, key, index) in player.stats"
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
import { iPlayer } from '@/interfaces/Player'
import { PlayerModel } from '@/assets/models/playerModel'
import { usePlayer } from '@/composables/usePlayer'
import { diceRollK2, diceRollK3, diceRollK10 } from '@/assets/scripts/diceRoll'
import { iWeapon } from '@/interfaces/Item'
import { iBodyParts } from '@/interfaces/BodyParts'

import { defineComponent, ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter()
        const { createPlayer, player } = usePlayer()

        const rollStats = () => {
            if (player.value.race === 'human') {
                player.value.stats.hp = diceRollK3() + 4
                player.value.stats.melee = diceRollK10() * 2 + 20
                player.value.stats.ranged = diceRollK10() * 2 + 20
                player.value.stats.dexterity = diceRollK10() + 20
                player.value.stats.strength = diceRollK3() + 1
                player.value.stats.thoughtness = diceRollK3() + 1
                player.value.stats.speed = diceRollK3() + 2
                player.value.stats.initiative = diceRollK10() * 2 + 20
                player.value.stats.attacks = 1
                player.value.stats.inteligence = diceRollK10() * 2 + 20
                player.value.stats.willPower = diceRollK10() * 2 + 20
                player.value.stats.charisma = diceRollK10() * 2 + 2
            }

            if (player.value.race === 'dwarf') {
                player.value.stats.hp = diceRollK3() + 5
                player.value.stats.melee = diceRollK10() * 2 + 30
                player.value.stats.ranged = diceRollK10() * 2 + 10
                player.value.stats.dexterity = diceRollK10() + 10
                player.value.stats.strength = diceRollK3() + 1
                player.value.stats.thoughtness = diceRollK3() + 2
                player.value.stats.speed = diceRollK2() + 2
                player.value.stats.initiative = diceRollK10() * 2 + 10
                player.value.stats.attacks = 1
                player.value.stats.inteligence = diceRollK10() * 2 + 20
                player.value.stats.willPower = diceRollK10() * 2 + 40
                player.value.stats.charisma = diceRollK10() * 2 + 1
            }
        }
        const savePlayer = () => {
            createPlayer(player.value)
            router.push({ name: 'home' })
        }
        return {
            player,
            rollStats,
            savePlayer,
            diceRollK2,
            diceRollK3,
            diceRollK10,
            defineComponent,
        }
    },
    methods: {},
})
</script>
