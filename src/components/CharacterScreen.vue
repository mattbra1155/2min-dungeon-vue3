<script setup lang="ts">
import { StatusBonusStat, StatusDamageOverTime } from '@/assets/models/statusItemModel'
import { useCharacterScreen } from '@/composables/useCharacterScreen'
import { usePlayerStore } from '@/stores/usePlayer'
import AIcon from './AIcon.vue'
import { getItemIcon } from '@/helpers/getItemIcon'
const playerStore = usePlayerStore()
const { isOpen, toggleCharacterScreen } = useCharacterScreen()
</script>

<template>
    <div v-if="isOpen && playerStore.player" class="o-characterScreen">
        <div class="o-characterScreen__header">
            <h1 class="a-text">Character screen</h1>
            <button class="a-button --secondary" @click="toggleCharacterScreen">Close</button>
        </div>

        <div class="o-characterScreen__detailsWrapper">
            <AIcon class="--fullWidth" :icon="getItemIcon('PlayerIcon')" />
            <div>
                <h2 class="a-text">{{ playerStore.player.name }}</h2>
                <p class="a-text" v-if="playerStore.player.profession">
                    Profession: {{ playerStore.player.profession.name }}
                </p>
                <p class="a-text">Race: {{ playerStore.player.race }}</p>
                <p class="a-text">Bio:</p>
                <p v-if="playerStore.player.description" class="a-text">{{ playerStore.player.description }}</p>
                <p v-else>unknown</p>
            </div>
        </div>
        <div class="o-characterScreen__statsWrapper">
            <h2 class="a-text">Profession advancement:</h2>
            <div class="o-characterScreen__statList">
                <template v-for="(value, key) in playerStore.player.profession?.statsDevelopment" :key="key">
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
                <template v-for="(value, key) in playerStore.player.currentStats" :key="key">
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
                <template v-for="skill in playerStore.player.skills" :key="skill.id">
                    <div v-if="skill" class="o-characterScreen__statItem">
                        <p class="a-text">{{ skill.name }}</p>
                    </div>
                </template>
            </div>
        </div>
        <div class="o-characterScreen__modifiersWrapper">
            <h2 class="a-text">Active Statuses:</h2>
            <template v-for="status in playerStore.player.status.list" :key="status.id">
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
