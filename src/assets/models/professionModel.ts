import { IProfession } from '@/interfaces/IProfession'
import { IStats } from '@/interfaces/IStats'
import { stats as statsModel } from '@/assets/models/statsModel'
class Profession implements IProfession {
    constructor(
        public id: string = `prof-${self.crypto.randomUUID()}`,
        public name: string = '',
        public description: string = '',
        public statsDevelopment: IStats = structuredClone(statsModel)
    ) {
        this.name = name
        this.description = description
        this.statsDevelopment = statsDevelopment
    }
}

export { Profession }
