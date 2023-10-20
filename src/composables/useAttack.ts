import { reactive, toRefs } from 'vue'

import { diceRollK100, diceRollK6 } from '@/assets/scripts/diceRoll'
import { MonsterModel } from '@/assets/models/monsterModel'
import { usePlayer } from '@/composables/usePlayer'
import { PlayerModel } from '@/assets/models/playerModel'

const { player } = usePlayer()

interface IAttackState {
    targetToAttack: MonsterModel | null
}

const state: IAttackState = reactive({
    targetToAttack: null,
})

export const useAttack = () => {
    //     const attack = (attacker: MonsterModel | PlayerModel, enemy: MonsterModel | PlayerModel) => {
    //         const diceRollHitResult = diceRollK100()
    //         console.log(`Dice roll: ${diceRollHitResult}`)
    //         // check if attack hits
    //         if (attacker.stats.melee > diceRollHitResult) {
    //             const diceRollBodyPartResult = diceRollK100()

    //             console.log(`Body part hit result: ${diceRollBodyPartResult}`)

    //             const getBodyPart = () => {
    //                 if (diceRollBodyPartResult >= 1 && diceRollBodyPartResult <= 15) {
    //                     console.log(`${attacker.name} hit ${enemy.name} in the Head`)
    //                     return enemy.bodyParts['head']
    //                 } else if (diceRollBodyPartResult >= 16 && diceRollBodyPartResult <= 35) {
    //                     console.log(`${attacker.name} hit ${enemy.name} in the Right arm`)
    //                     return enemy.bodyParts.rightArm
    //                 } else if (diceRollBodyPartResult >= 36 && diceRollBodyPartResult <= 55) {
    //                     console.log(`${attacker.name} hit ${enemy.name} in the Left arm`)
    //                     return enemy.bodyParts.leftArm
    //                 } else if (diceRollBodyPartResult >= 56 && diceRollBodyPartResult <= 80) {
    //                     console.log(`${attacker.name} hit ${enemy.name} in the Torso`)
    //                     return enemy.bodyParts['torso']
    //                 } else if (diceRollBodyPartResult >= 81 && diceRollBodyPartResult <= 90) {
    //                     console.log(`${attacker.name} hit ${enemy.name} in the Right leg`)
    //                     return enemy.bodyParts.rightLeg
    //                 } else if (diceRollBodyPartResult >= 91 && diceRollBodyPartResult <= 100) {
    //                     console.log(`${attacker.name} hit ${enemy.name} in the Left leg`)
    //                     return enemy.bodyParts.leftLeg
    //                 }
    //             }

    //             const savedBodyPart = getBodyPart()

    //             const enemyArmorPoints = savedBodyPart?.armor.armorPoints
    //             // const enemyArmorName = savedBodyPart.name

    //             // Calculate damage
    //             const damage = () => {
    //                 const damageDiceRoll = diceRollK6()
    //                 let damagePoints =
    //                     attacker.stats.strength -
    //                     enemy.stats.thoughtness -
    //                     (enemyArmorPoints ? enemyArmorPoints : 0) +
    //                     ((attacker.weapon === null ? 0 : attacker.weapon.damage) + damageDiceRoll)
    //                 if (damagePoints < 0) {
    //                     damagePoints = 0
    //                 }
    //                 console.log('ttt', attacker.weapon?.damage)
    //                 console.log(damagePoints)
    //                 return damagePoints
    //             }
    //             /*  turn.turns.unshift({
    //                 person: this,
    //                 action: `${this.name} rolls: ${diceRollHitResult} and hit's ${
    //                     enemy.name
    //                 } in ${enemyArmorName} for ${damage()} damage with ${
    //                     this.weapon.name
    //                 }`
    //             }) */

    //             // reduce health
    //             // playerTakeDamage(damage())
    //             const finalDamage = damage()

    //             console.log(`${enemy.name} took ${finalDamage} damage`)
    //             enemy.stats.hp -= finalDamage
    //             return finalDamage | 0
    //         }
    //         // } else {
    //         //     // add action to the turn array
    //         //     /* turn.turns.unshift({
    //         //         person: this,
    //         //         action: `${this.name} rolls: ${diceRollHitResult} and misses.`
    //         //     }) */
    //         // }
    //     }
    // const playerAttackTarget = () => {
    //     if (!player.value) {
    //         return
    //     }
    //     if (!state.targetToAttack) {
    //         console.log('choose target')
    //     } else {
    //         attack(player.value, state.targetToAttack)
    //     }
    // }

    const setTargetToAttack = (enemy: MonsterModel | null) => {
        state.targetToAttack = enemy
    }
    return {
        ...toRefs(state),
        // attack,
        setTargetToAttack,
        // playerAttackTarget,
    }
}
