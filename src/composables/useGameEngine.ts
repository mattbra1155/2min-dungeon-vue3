import { reactive, readonly } from "vue"

const state = reactive({
    activeState: '',
    states: ['init', 'menu', 'paused', 'player turn', 'enemy turn']
})

export default function useGameEngine()  {

    const setActiveState = (payload: string) => state.activeState = payload

    const getActiveState = () => state.activeState

    return {
        state: readonly(state),
        getActiveState
    }
   
}
    

    // showInventory() {
    //     const inventoryPage = document.querySelector('#inventory')
    //     const inventoryButton = document.querySelector('#inventoryButton')
    //     const inventoryList = document.querySelector('#inventoryList')
    //     /*const inventoryCloseButton = document.querySelector(
    //         '#inventoryCloseButton'
    //     )*/

    //     const level = sceneEngine.currentScene

    //     const createItemList = item => {
    //         // item row
    //         console.log(level.player.inventory)
    //         const listItem = document.createElement('li')
    //         listItem.setAttribute('class', 'inventory__item')
    //         listItem.textContent = item.name
    //         inventoryList.appendChild(listItem)

    //         // action button for row
    //         const useButton = document.createElement('button')
    //         useButton.setAttribute('class', 'item__button')
    //         switch (item.category) {
    //             case 'armor':
    //                 useButton.textContent = 'Wear'
    //                 break
    //             case 'weapon':
    //                 useButton.textContent = 'Equip'
    //                 break
    //             case 'potion':
    //                 useButton.textContent = 'Use'
    //                 break
    //             case 'utility':
    //                 useButton.textContent = 'Equip'
    //                 break
    //         }
    //         useButton.addEventListener('click', () => {
    //             const removeInventoryList = () => {
    //                 const inventoryItems = document.querySelectorAll(
    //                     '.inventory__item'
    //                 )
    //                 inventoryItems.forEach(item => item.remove())
    //             }
    //             // check the item category
    //             if (item.category === 'weapon') {
    //                 if (level.player.weapon !== '') {
    //                     // get the item that is already in use from character
    //                     level.player.inventory.push(level.player.weapon)
    //                 }
    //                 // remove all item form DOM inventory to update it
    //                 removeInventoryList()
    //             }
    //             if (item.category === 'armor') {
    //                 if (
    //                     level.player.bodyPart[item.bodyPart].armor.item !== ''
    //                 ) {
    //                     level.player.inventory.push(
    //                         level.player.bodyPart[item.bodyPart].armor.item
    //                     )
    //                 }
    //                 removeInventoryList()
    //             }
    //             // remove equiped item from inventory, return a new array without the equiped item
    //             const updatedInventory = level.player.inventory.filter(
    //                 elem => elem !== item
    //             )
    //             // equip item on character
    //             level.player.equipItem(item)

    //             // assign the updated inventory to the player inventory
    //             level.player.inventory = updatedInventory

    //             // rerender the inventory with the item from character in the inventory and the equiped item removed from inventory
    //             level.player.inventory.forEach(item => createItemList(item))
    //         })

    //         listItem.appendChild(useButton)
    //     }

    //     inventoryButton.disabled = true
    //     inventoryPage.style.display = 'flex'
    //     level.player.inventory.forEach(item => createItemList(item))
    //     console.log(level.player.inventory)
    // }

    // closeInventory() {
    //     const inventoryPage = document.querySelector('#inventory')
    //     const inventoryItems = document.querySelectorAll('.inventory__item')
    //     inventoryItems.forEach(item => item.remove())
    //     inventoryPage.style.display = 'none'
    //     //inventoryButton.disabled = false
    // }

    // startScreen() {
    //     document.addEventListener('DOMContentLoaded', e => {
    //         e.preventDefault()
    //         const overlayscreen = document.createElement('div')
    //         overlayscreen.setAttribute('class', 'overlay start-screen')

    //         const header = document.createElement('h1')
    //         header.setAttribute('class', 'text--white text--center')
    //         header.textContent = `2 MINUTE DUNGEON`
    //         overlayscreen.appendChild(header)

    //         const button = document.createElement('button')
    //         button.textContent = 'START'
    //         button.setAttribute('id', 'startButton')
    //         button.setAttribute('class', 'action__button')
    //         overlayscreen.appendChild(button)

    //         const app = document.querySelector('#app')
    //         app.appendChild(overlayscreen)

    //         const startButton = document.querySelector('#startButton')
    //         startButton.addEventListener('click', e => {
    //             e.preventDefault()
    //             overlayscreen.remove()
    //             if (!localStorage.getItem('player')) {
    //                 sceneEngine.sceneManager('characterCreation')
    //             } else {
    //                 sceneEngine.sceneManager('nextLevel')
    //             }
    //         })
    //     })
    // }