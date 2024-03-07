// import { Player, Monster, global, races } from '../scripts/index.js'
// import { bestiary } from './bestiary.js'
// import { ItemGenerator } from './itemGenerator.js'
// import { sceneEngine } from '../scripts/scenes.js'

// class CharacterGenerator extends Player {
//     constructor(
//         name,
//         race,
//         hp,
//         melee,
//         ranged,
//         dexterity,
//         strength,
//         thoughtness,
//         speed,
//         initiative,
//         attacks,
//         inteligence,
//         willpower,
//         charisma,
//         weapon,
//         inventory,
//         description
//     ) {
//         super(
//             name,
//             race,
//             hp,
//             melee,
//             ranged,
//             dexterity,
//             strength,
//             thoughtness,
//             speed,
//             initiative,
//             attacks,
//             inteligence,
//             willpower,
//             charisma,
//             weapon,
//             inventory,
//             description
//         )
//     }

//     createPlayer() {
//         let character = {
//             name: '',
//             race: '',
//             stats: '',
//             weapon: '',
//             inventory: [],
//             description: '',
//         }
//         // make the page visible
//         document.querySelector('#characterGenerator').style.display = 'flex'

//         const characterCreationScreen = document.querySelector('#characterGenerator')
//         const charName = document.querySelector('#characterName')
//         const charRace = document.querySelectorAll('.item__input[name="playerRace"]')
//         const charBio = document.querySelector('#characterBio')
//         // const charClass = document.querySelector('#charcterClass')
//         const charStats = document.querySelector('#statList')
//         // const charInventory = document.querySelector('#charInventory')
//         // const charWeapon = document.querySelector('#charWeapon')
//         const GenerateStatsButton = document.querySelector('#generateStatsButton')
//         // const ConfirmNameButton = document.querySelector('#confirmNameButton')
//         const createPlayerButton = document.querySelector('#createPlayerButton')

//         // NAME
//         const getName = () => {
//             return charName.value
//         }

//         // RACE
//         const getRace = () => {
//             const result = races.find((elem) => elem.name === event.target.value)
//             return result
//         }

//         const charRaceArray = Array.from(charRace)

//         charRaceArray.forEach((elem) =>
//             elem.addEventListener('change', () => {
//                 const savedRace = getRace()

//                 character.race = savedRace
//             })
//         )

//         // STATS
//         const getStats = () => {
//             const raceStats = () => {
//                 if (character.race.name === 'human') {
//                     const stats = {
//                         hp: global.diceRollK3(),
//                         melee: global.diceRollK10() * 2,
//                         ranged: global.diceRollK10() * 2,
//                         dexterity: global.diceRollK10(),
//                         strength: global.diceRollK3(),
//                         thoughtness: global.diceRollK3(),
//                         speed: global.diceRollK3(),
//                         initiative: global.diceRollK10() * 2,
//                         attacks: 1,
//                         inteligence: global.diceRollK10() * 2,
//                         'will power': global.diceRollK10() * 2,
//                         charisma: global.diceRollK10() * 2,
//                     }

//                     return stats
//                 } else if (character.race.name === 'dwarf') {
//                     const stats = {
//                         hp: global.diceRollK3(),
//                         melee: global.diceRollK10() * 2,
//                         ranged: global.diceRollK10() * 2,
//                         dexterity: global.diceRollK10(),
//                         strength: global.diceRollK3(),
//                         thoughtness: global.diceRollK3(),
//                         speed: global.diceRollK2(),
//                         initiative: global.diceRollK10() * 2,
//                         attacks: 1,
//                         inteligence: global.diceRollK10() * 2,
//                         'will power': global.diceRollK10() * 2,
//                         charisma: global.diceRollK10() * 2,
//                     }

//                     return stats
//                 }
//             }

//             const stats = raceStats()
//             const modifiers = character.race.statModifiers

//             // combine generated stats with race bonus
//             const computeStats = Object.keys(stats)
//                 .concat(Object.keys(modifiers))
//                 .reduce((sum, key) => {
//                     sum[key] = stats[key] + modifiers[key]
//                     return sum
//                 }, {})

//             const populateStatFileds = () => {
//                 // if statItem's exists - remove from DOM
//                 const statItem = document.querySelectorAll('.stat__item')
//                 statItem.forEach((elem) => elem.remove())

//                 // create statItem's and append to DOM
//                 Object.entries(computeStats).forEach(([key, value]) => {
//                     const statItem = document.createElement('div')
//                     statItem.setAttribute('class', 'stat__item')

//                     const statName = document.createElement('div')
//                     statName.setAttribute('class', 'stat__name')
//                     statName.textContent = key

//                     const statValue = document.createElement('div')
//                     statValue.setAttribute('class', 'stat__value')
//                     statValue.textContent = value

//                     statItem.appendChild(statName)
//                     statItem.appendChild(statValue)

//                     charStats.appendChild(statItem)
//                 })
//             }

//             populateStatFileds()

//             return computeStats
//         }

//         GenerateStatsButton.addEventListener('click', () => {
//             // todo
//             character.stats = getStats()
//         })

//         // ROLL SKILLS
//         // todo

//         // DESCRIPTION
//         // todo
//         const getDescription = () => {
//             return (character.description = charBio.value)
//         }

//         // INVENTORY
//         // todo
//         const getInventory = () => {
//             /*  const addWeapon = new ItemGenerator().createItem('weapon');
//             const addArmor = new ItemGenerator().createItem('armor');
//             character.inventory.push(addWeapon, addArmor);
//             console.log(character.inventory) */
//             return character.inventory
//         }

//         // CHOOSE WEAPONS
//         const getWeapon = new ItemGenerator().createItem('weapon')

//         // FINAL OBJECT RETURN
//         createPlayerButton.addEventListener('click', () => {
//             character.name = getName()

//             if (character.stats === '' || character.name === '') {
//                 alert('first finish creating your character!')
//             } else {
//                 character.weapon = getWeapon
//                 character.inventory = getInventory()
//                 character.description = getDescription()

//                 const player = new Player()
//                 player.name = character.name
//                 player.race = character.race.name
//                 player.stats = character.stats
//                 player.weapon = character.weapon
//                 player.inventory = character.inventory
//                 player.description = character.description

//                 console.log(player.inventory)
//                 //store created player stats in localstorage (need to assign to Player class later)
//                 localStorage.setItem('player', JSON.stringify(player))
//                 sceneEngine.sceneManager('nextLevel')
//                 characterCreationScreen.remove()
//                 global.updatePersonHealth()
//             }
//         })
//     }
// }

// class MonsterGenerator extends Monster {
//     constructor(
//         name,
//         hp,
//         melee,
//         ranged,
//         dexterity,
//         strength,
//         thoughtness,
//         speed,
//         initiative,
//         attacks,
//         inteligence,
//         willpower,
//         charisma,
//         weapon,
//         inventory,
//         description
//     ) {
//         super(
//             name,
//             hp,
//             melee,
//             ranged,
//             dexterity,
//             strength,
//             thoughtness,
//             speed,
//             initiative,
//             attacks,
//             inteligence,
//             willpower,
//             charisma,
//             weapon,
//             inventory,
//             description
//         )
//     }

//     createMonster() {
//         const monster = bestiary[Math.floor(Math.random() * bestiary.length)]

//         monster.weapon = new ItemGenerator().createItem('weapon')

//         const getMonsterClass = new Monster()

//         Object.assign(getMonsterClass, monster)

//         return getMonsterClass
//     }
// }

// export { CharacterGenerator, MonsterGenerator }
