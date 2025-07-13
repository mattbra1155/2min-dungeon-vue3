/* eslint-disable no-undef */
import fs from 'node:fs/promises'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

let mapGrid = []
let mapLocations = []

function parseCSVToGrid(csvString, rowLength = 42) {
    const cleanedArray = csvString.replace(/(\r\n|\n|\r)/gm, ',').split(',');
    const grid = []
    for (let i = 0; i < cleanedArray.length; i += rowLength) {
        grid.push(cleanedArray.slice(i, i + rowLength))
    }
    return grid
}

async function prepareMapGrid() {
    try {

        const filePath = `${__dirname}/map.csv`
        const data = await fs.readFile(filePath, { encoding: 'utf8' })
        mapGrid = parseCSVToGrid(data)
        console.log('mapGrid - done')
    } catch (err) {
        console.error('Error preparing map grid:', err)
    }
}



async function generateLocationMap() {
    mapLocations = []

    mapGrid.forEach((row, y) => {
        row.forEach((name, x) => {
            mapLocations.push({ name, x, y })
        })
    })

    console.log('mapLocations - done')
}

async function createLocationsJSON() {
    try {
        const filePath = `${__dirname}/templocations.json`
        const writePath = resolve(__dirname, `../src/assets/json/locations.json`)
        const data = await fs.readFile(filePath, { encoding: 'utf8' })
        const POIData = JSON.parse(data)

        const locationDescriptions = {
            grassland: `Entering the grassland, you're surrounded by a vast expanse of undulating golden - green.The landscape stretches out before you, a sea of swaying blades of grass punctuated by colorful wildflowers.`,
            forest: `The forest looms ahead, a dense thicket of trees and underbrush. The air is thick with the scent of damp earth and foliage, and the sounds of rustling leaves and distant animal calls fill the air.`,
            swamp: `The swamp is a murky expanse of water and mud, where the air is thick with humidity and the scent of decay. The ground squelches beneath your feet, and the sounds of croaking frogs and buzzing insects fill the air.`,
            forest_road: `The forest road winds its way through the trees, a narrow path barely visible beneath the thick underbrush. The air is cool and damp, and the sounds of rustling leaves and distant animal calls fill the air.`,
            road: `An old, overgrown road winds its way through the landscape, its once smooth surface now cracked and weathered. Thick vegetation encroaches from all sides, reclaiming the path inch by inch. Nature's relentless advance has transformed the road into a forgotten trail, a relic of a bygone era.`,
            high_mountains: `Towerous mountains loom, impassable barriers cutting the horizon. Their jagged peaks pierce the sky, cloaked in perpetual snow. Valleys yawning between them seem unreachable, lost to the clouds. No path, no passage; these formidable giants stand as guardians of the untamed wilderness, daunting and unconquerable.`,
            mountains: `The mountains rise, their majestic peaks beckoning adventurers. Yet, their treacherous slopes and winding paths demand respect. Each step is a test of skill and endurance, doubling the journey's length. Despite the breathtaking vistas, the unforgiving terrain serves as a reminder of nature's formidable challenges and the price of passage.`,
            foothills: `The foothills sprawl at the base of the towering mountains, their gentle slopes a transition between lowlands and peaks. Dappled with patches of verdant greenery and scattered with boulders, they offer a prelude to the grandeur above. Here, the land undulates in harmony, teasing with the promise of higher heights.`,
            fields: `Amidst the desolation, fields sprawl untended, once-rich crops now withered and rotting. Neglected and forgotten, they stand as a testament to abandonment. Weeds choke the earth, reclaiming what was once cultivated. Nature's reclaiming hand transforms the once-thriving fields into a somber tableau of decay and neglect.`,
        }

        const enrichedLocations = mapLocations.map(loc => {
            const id = loc.name.trim().toLowerCase().replace(/\s+/g, '_')
            const description = locationDescriptions[id] || ''

            const poiMatch = POIData.find(poi => poi.id === id) || {}

            return {
                ...loc,
                id,
                description,
                ...poiMatch // `poiMatch` may override previous values if needed
            }
        })

        await fs.writeFile(writePath, JSON.stringify(enrichedLocations, null, 2))

        console.log('createLocationsJSON - done')
    } catch (err) {
        console.error('Error creating locations JSON:', err)
    }
}

async function init() {
    await prepareMapGrid()
    await generateLocationMap()
    await createLocationsJSON()
}

init()

export { mapGrid, mapLocations, init }
