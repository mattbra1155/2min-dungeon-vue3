<!-- <template>
    <div class="o-interface">
        <button
            id="attackButtonOne"
            type="button"
            class="action__button"
            @click="attack"
        >
            Attack1
        </button>
        <button id="inventoryButton" type="button" class="action__button">
            Inventory
        </button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Interface',
    computed: {
        player() {
            return this.$store.getters['player/getPlayer']
        },
        enemy() {
            return this.$store.getters['enemy/getEnemy']
        }
    },
    mounted() {},
    methods: {
        attack() {
            this.$store.dispatch('player/attack', this.player)
            // this.player.attack(this.enemy)
        }
    }
}
</script>

<style></style>
 -->
