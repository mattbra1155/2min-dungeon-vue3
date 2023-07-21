import { Armor } from '@/assets/models/itemsModel'

export const getTotalArmorPoints = (item: Armor) => {
    return item.armorPoints + item.prefix.modifier
}
