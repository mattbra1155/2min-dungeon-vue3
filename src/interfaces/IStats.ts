export interface IStat {
    name: string
    symbol: string
    value: number
}

export interface IStats {
    hp: IStat
    melee: IStat
    ranged: IStat
    dexterity: IStat
    strength: IStat
    thoughtness: IStat
    speed: IStat
    initiative: IStat
    attacks: IStat
    inteligence: IStat
    willPower: IStat
    charisma: IStat
}
