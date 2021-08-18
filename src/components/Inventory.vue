<template>
    <div id="inventory" class="inventory">
        <h2>Inventory</h2>
        <button id="inventoryCloseButton" class="close">Close Inventory</button>
        <ul id="inventoryList" class="inventory__list"></ul>
    </div>
</template>

<script>
export default {
    name: 'Inventory'
}
</script>

<style lang="sass">

.inventory
    display: flex
    flex-flow: row wrap
    width: 30%
    height: 100vh
    position: absolute
    top: 0
    left: 0
    background: #ededed
    z-index: 100
    &__list
        display: flex
        flex-direction: column
        justify-content: flex-start
        align-items: center
        width: 100%
        height: 100%
        padding: 5%
    &__item
        display: flex
        flex-direction: row
        justify-content: space-between
        width: 100%
</style>
