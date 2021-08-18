/* import { sceneEngine, turn } from './index.js';

/// INPUTS
const attackButton = document.querySelector('#attackButtonOne');
const inventoryButton = document.querySelector("#inventoryButton");
// const inventoryScreen = document.querySelector('#inventory')
const inventoryCloseButton = document.querySelector('#inventoryCloseButton');

const attack = attackButton.addEventListener('click', e => {

    const level = sceneEngine.currentScene;

    e.preventDefault();
    e.stopPropagation();

    if (level.player.isAlive && level.monster.isAlive) {
        turn.playerTurn();
    }
    
    
    //change to enemy turn
    if (level.monster.isAlive && level.player.isAlive) {
        const attackDelay = setTimeout(() => turn.enemyTurn(), 1200);
        return attackDelay
    } 
});

inventoryButton.addEventListener('click', sceneEngine.showInventory);
inventoryCloseButton.addEventListener('click', sceneEngine.closeInventory);

export {attack, attackButton}
 */