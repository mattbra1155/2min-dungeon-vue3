<template>
    <div id="app">
        <nav class="nav">
            <router-link to="/">Main</router-link>
            <router-link to="/character-creation/">Create</router-link>
        </nav>
        <router-view />
    </div>
</template>

<script lang="ts">
// import { SceneManager } from '@/assets/scripts/sceneManager'
import useGameEngine from '@/composables/useGameEngine'
import { defineComponent, reactive } from 'vue'
import { iPlayer } from '@/interfaces/iPlayer'
import { iWeapon } from '@/interfaces/iItem'
import { iBodyParts } from '@/interfaces/iBodyParts'
import usePlayer from '@/composables/usePlayer'
import { PlayerModel } from '@/assets/models/playerModel'
export default defineComponent({
    setup() {
        const player = new PlayerModel(
            'test',
            'test',
            'test',
            {
                hp: 2,
                melee: 0,
                ranged: 0,
                strength: 0,
                speed: 0,
                dexterity: 0,
                inteligence: 0,
                initiative: 0,
                attacks: 0,
                willPower: 0,
                charisma: 0,
                thoughtness: 0,
            },
            {
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
            {
                name: 'test',
                description: 'test',
                id: 1,
                category: 'sword',
                damage: 1,
                type: 'sword',
                prefix: 'string',
                modifier: 'stt',
            },
            'desc',
            [
                {
                    name: 'test',
                    description: 'test',
                    id: 1,
                    category: 'sword',
                    damage: 1,
                    type: 'sword',
                    prefix: 'string',
                    modifier: 'stt',
                },
            ],
            true,
            true
        )
        return {}
    },
})
</script>
