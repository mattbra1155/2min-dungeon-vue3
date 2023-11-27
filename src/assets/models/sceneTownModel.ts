interface Shop {
    id: string
    name: string
    // inventory?
}

interface Town {
    id: string
    name: string
    description: string
    shops: Shop[]
}

class Town {
    // constructor() {}
}

export { Town }
