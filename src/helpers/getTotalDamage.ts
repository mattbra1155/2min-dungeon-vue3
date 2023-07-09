import { IWeapon } from '@/interfaces/IItem'

export const getTotalDamage = (item: IWeapon) => {
    return item.damage + item.prefix?.modifier
}
