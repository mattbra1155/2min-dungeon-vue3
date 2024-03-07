import { IProfession } from '@/interfaces/IProfession'
import { IStats } from '@/interfaces/IStats'
import { stats as statsModel } from '@/assets/models/statsModel'
import { ISkill } from '@/interfaces/ISkill'
class Profession implements IProfession {
    constructor(
        public id: string = `prof-${self.crypto.randomUUID()}`,
        public name: string = '',
        public description: string = '',
        public statsDevelopment: IStats = structuredClone(statsModel),
        public skills: ISkill[] = []
    ) {
        this.name = name
        this.description = description
        this.statsDevelopment = statsDevelopment
        this.skills = skills
    }
}

export { Profession }
