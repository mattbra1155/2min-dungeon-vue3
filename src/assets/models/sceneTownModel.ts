import { AllItemTypes } from '@/interfaces/IItem'

interface Shop {
    id: string
    name: string
    inventory: AllItemTypes[] | []
}

interface Town {
    id: string
    name: string
    description: string
    shops: Shop[]
    activeShopId: string | undefined
}

class Town {
    public shops: Shop[]
    constructor() {
        this.id = 'town'
        this.name = 'Oakwood'
        this.description = 'Nice town'
        this.shops = [{ id: 'merchant', name: 'merchant', inventory: [] }]
        this.activeShopId = undefined
    }

    enterMerchantShop() {
        this.activeShopId = 'merchant'
    }
}

export { Town }
