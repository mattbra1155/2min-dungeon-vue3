import { AllItemTypes } from '@/interfaces/IItem'
import locations from '@/assets/json/locations.json'

const town = locations.find((item) => item.id === 'town')
interface Shop {
    id: string
    name: string
    inventory: AllItemTypes[] | []
}

interface Town {
    id: string
    name: string
    shortDescription: string | undefined
    description: string | undefined
    shops: Shop[]
    activeShopId: string | undefined
}

class Town {
    public shops: Shop[]
    public description: string | undefined
    constructor() {
        this.id = 'town'
        this.name = 'Oakwood'
        this.shortDescription = town?.shortDescription
        this.description = town?.description
        this.shops = [{ id: 'merchant', name: 'merchant', inventory: [] }]
        this.activeShopId = undefined
    }

    enterMerchantShop() {
        this.activeShopId = 'merchant'
    }
}

export { Town }
