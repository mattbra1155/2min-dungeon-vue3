import { IProfession } from '@/interfaces/IProfession'
import { IStats } from '@/interfaces/IStats'
import { stats as statsModel } from '@/assets/models/statsModel'
class Profession implements IProfession {
    constructor(
        public id: string = '0',
        public name: string = '',
        public description: string = '',
        public statsDevelopment: Partial<IStats> = statsModel
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.statsDevelopment = statsDevelopment
    }
}

export { Profession }
