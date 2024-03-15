<script setup lang="ts">
import { StatusBonusStat, StatusDamageOverTime } from '@/assets/models/statusItemModel'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { usePlayer } from '@/composables/usePlayer'
const { isOpen, toggleCharacterScreen } = useCharacterScreen()
const { player } = usePlayer()
import AIcon from './AIcon.vue'
import { getItemIcon } from '@/helpers/getItemIcon'
</script>

<template>
    <div v-if="isOpen" class="o-characterScreen">
        <div class="o-characterScreen__header">
            <h1 class="a-text">Character screen</h1>
            <button class="a-button --secondary" @click="toggleCharacterScreen">Close</button>
        </div>

        <div class="o-characterScreen__detailsWrapper">
            <AIcon class="--fullWidth" :icon="getItemIcon('PlayerIcon')" />
            <!-- <picture class="o-characterScreen__imageWrapper">
                <source srcset="https://placehold.co/200x200" media="(max-width: 768px )" />
                <img src="https://placehold.co/200x200" alt="" class="a-image m-inventoryItem__image" />
            </picture> -->
            <div>
                <h2 class="a-text">{{ player.name }}</h2>
                <p class="a-text" v-if="player.profession">Profession: {{ player.profession.name }}</p>
                <p class="a-text">Race: {{ player.race }}</p>
                <p class="a-text">Bio:</p>
                <p v-if="player.description" class="a-text">{{ player.description }}</p>
                <p v-else>unknown</p>
            </div>
        </div>
        <div class="o-characterScreen__statsWrapper">
            <h2 class="a-text">Profession advancement:</h2>
            <div class="o-characterScreen__statList">
                <template v-for="(value, key) in player.profession?.statsDevelopment" :key="key">
                    <!-- {{ key }} -->
                    <div v-if="value > 0" class="o-characterScreen__statItem">
                        <p class="a-text">{{ key }}</p>
                        <p class="a-text">+{{ value }}</p>
                    </div>
                </template>
            </div>
        </div>
        <div class="o-characterScreen__statsWrapper">
            <h2 class="a-text">Stats:</h2>
            <div class="o-characterScreen__statList">
                <template v-for="(value, key) in player.currentStats" :key="key">
                    <div v-if="value" class="o-characterScreen__statItem">
                        <p class="a-text">{{ key }}</p>
                        <p class="a-text">{{ value }}</p>
                    </div>
                </template>
            </div>
        </div>
        <div class="o-characterScreen__statsWrapper">
            <h2 class="a-text">Skills:</h2>
            <div class="o-characterScreen__statList --skills">
                <template v-for="skill in player.skills" :key="skill.id">
                    <div v-if="skill" class="o-characterScreen__statItem">
                        <p class="a-text">{{ skill.name }}</p>
                    </div>
                </template>
            </div>
        </div>
        <div class="o-characterScreen__modifiersWrapper">
            <h2 class="a-text">Active Statuses:</h2>
            <template v-for="status in player.status.list" :key="status.id">
                <p v-if="status instanceof StatusBonusStat">
                    <span class="a-text">{{ status.name }} </span>&nbsp; &rarr; &nbsp;
                    <span class="a-text" v-for="(value, key) in status.bonusStatList" :key="key">
                        {{ key }}: {{ Math.sign(value!) ? `+${value}` : `${value}` }}</span
                    >
                </p>
                <p class="a-text" v-else>{{ status.name }}</p>
            </template>
        </div>
    </div>
</template>
