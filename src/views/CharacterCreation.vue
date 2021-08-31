import { defineComponent } from 'vue';
<template>
    <div
        id="characterGenerator"
        class="o-characterGenerator"
        @submit.prevent="savePlayer"
    >
        <form class="m-form o-characterGenerator__sheet">
            <h2 class="o-characterGenerator__header">
                Character creation sheet
            </h2>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <label for="playerName" class="header">Name</label>
                    <input
                        type="text"
                        name="playerName"
                        v-model="character.name"
                    />
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
                            v-model="character.race"
                        />
                    </div>
                    <div class="o-characterGenerator__item">
                        <label for="dwarf">Dwarf</label>
                        <input
                            type="radio"
                            name="playerRace"
                            value="dwarf"
                            class="item__input"
                            v-model="character.race"
                        />
                    </div>
                </div>
                <div class="m-form__column">
                    <p class="a-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam labore debitis nam. Cupiditate alias ad
                        voluptatum quos aut, magnam ea totam culpa vero fuga.
                        Adipisci asperiores quae sint dicta. Repellendus?
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
                                v-model="character.profession"
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
                                v-model="character.profession"
                            />
                        </label>
                    </div>
                </div>
            </div>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <label for="bio" class="o-characterGenerator__header"
                        >Bio</label
                    >
                    <textarea
                        type="text"
                        name="bio"
                        id="characterBio"
                        rows="5"
                        v-model="character.description"
                    ></textarea>
                </div>
            </div>
            <div class="m-form__row o-characterGenerator__row">
                <div class="m-form__column">
                    <h2 class="o-characterGenerator__header">Stats</h2>
                    <button
                        type="button"
                        @click="rollStats(character.race)"
                        id="generateStatsButton"
                        class="button action__button"
                    >
                        Roll dice
                    </button>
                    <div id="statList" class="o-characterGenerator__statList">
                        <div
                            v-for="(value, key, index) in character.stats"
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
                    <button
                        type="submit"
                        id="createPlayerButton"
                        class="button action__button"
                    >
                        Create
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { iPlayer } from '@/interfaces/iPlayer'
import { PlayerModel } from '@/assets/models/playerModel'
import usePlayer from '@/composables/usePlayer'
import { diceRollK2, diceRollK3, diceRollK10 } from '@/assets/scripts/diceRoll'
import { iWeapon } from '@/interfaces/iItem'
import { iBodyParts } from '@/interfaces/iBodyParts'

import { defineComponent, ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter()
        const isActive = ref(false)
        const { createPlayer, getPlayer } = usePlayer()
        let character = reactive<iPlayer>({
            name: '',
            race: 'human',
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
            weapon: null,
            description: '',
            inventory: [],
            bodyParts: {
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
            player: true,
            isAlive: true,
        })

        const emptyPlayer = computed(() => getPlayer)

        const savePlayer = () => {
            createPlayer(character)
        }

        const rollStats = (race: string) => {
            if (character.race === 'human') {
                character.stats.hp = diceRollK3() + 4
                character.stats.melee = diceRollK10() * 2 + 20
                character.stats.ranged = diceRollK10() * 2 + 20
                character.stats.dexterity = diceRollK10() + 20
                character.stats.strength = diceRollK3() + 1
                character.stats.thoughtness = diceRollK3() + 1
                character.stats.speed = diceRollK3() + 2
                character.stats.initiative = diceRollK10() * 2 + 20
                character.stats.attacks = 1
                character.stats.inteligence = diceRollK10() * 2 + 20
                character.stats.willPower = diceRollK10() * 2 + 20
                character.stats.charisma = diceRollK10() * 2 + 2
            }

            if (character.race === 'dwarf') {
                character.stats.hp = diceRollK3() + 5
                character.stats.melee = diceRollK10() * 2 + 30
                character.stats.ranged = diceRollK10() * 2 + 10
                character.stats.dexterity = diceRollK10() + 10
                character.stats.strength = diceRollK3() + 1
                character.stats.thoughtness = diceRollK3() + 2
                character.stats.speed = diceRollK2() + 2
                character.stats.initiative = diceRollK10() * 2 + 10
                character.stats.attacks = 1
                character.stats.inteligence = diceRollK10() * 2 + 20
                character.stats.willPower = diceRollK10() * 2 + 40
                character.stats.charisma = diceRollK10() * 2 + 1
            }
        }
        return {
            character,
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
