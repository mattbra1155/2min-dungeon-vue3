/* eslint-disable no-undef */
import { log } from 'node:console'
import fs from 'node:fs/promises'
import { dirname, resolve, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

let mapGrid = []
let mapLocations = []

function parseCSVToGrid(csvString) {
    return csvString
        .trim()
        .split(/\r?\n/) // split into rows
        .map((line) => line.split(',')) // split into cells
}

async function prepareMapGrid() {
    try {
        const filePath = join(__dirname, 'uuu.csv')
        const data = await fs.readFile(filePath, { encoding: 'utf8' })
        mapGrid = parseCSVToGrid(data)
        console.log('mapGrid - done')
    } catch (err) {
        console.error('Error preparing map grid:', err)
    }
}

async function generateLocationMap() {
    mapLocations = []

    mapGrid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            mapLocations.push({
                name: cell,
                x: colIndex, // horizontal
                y: rowIndex, // vertical
            })
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
        const normalizeKey = (str) => str.trim().toLowerCase().replace(/\s+/g, '_')

        const locationDescriptionsRaw = {
            grassland: `Entering the grassland, you're surrounded by a vast expanse of undulating golden-green.The landscape stretches out before you, a sea of swaying blades of grass punctuated by colorful wildflowers.`,
            forest: `The forest looms ahead, a dense thicket of trees and underbrush. The air is thick with the scent of damp earth and foliage, and the sounds of rustling leaves and distant animal calls fill the air.`,
            swamp: `The swamp is a murky expanse of water and mud, where the air is thick with humidity and the scent of decay. The ground squelches beneath your feet, and the sounds of croaking frogs and buzzing insects fill the air.`,
            road: `An old, overgrown road winds its way through the landscape...`,
            high_mountains: `Towerous mountains loom, impassable barriers cutting the horizon. Their jagged peaks pierce the sky, cloaked in perpetual snow. Valleys yawning between them seem unreachable, lost to the clouds. No path, no passage; these formidable giants stand as guardians of the untamed wilderness, daunting and unconquerable.`,
            mountains: `The mountains rise, their majestic peaks beckoning adventurers. Yet, their treacherous slopes and winding paths demand respect. Each step is a test of skill and endurance, doubling the journey's length. Despite the breathtaking vistas, the unforgiving terrain serves as a reminder of nature's formidable challenges and the price of passage.`,
            foothills: `The foothills sprawl at the base of the towering mountains, their gentle slopes a transition between lowlands and peaks. Dappled with patches of verdant greenery and scattered with boulders, they offer a prelude to the grandeur above. Here, the land undulates in harmony, teasing with the promise of higher heights.`,
            fields: `Amidst the desolation, fields sprawl untended, once-rich crops now withered and rotting. Neglected and forgotten, they stand as a testament to abandonment. Weeds choke the earth, reclaiming what was once cultivated. Nature's reclaiming hand transforms the once-thriving fields into a somber tableau of decay and neglect.`,
        }

        // Apply normalization to ensure consistent lookups
        const locationDescriptions = Object.fromEntries(
            Object.entries(locationDescriptionsRaw).map(([k, v]) => [normalizeKey(k), v])
        )

        const enrichedLocations = mapLocations.map((loc) => {
            const id = normalizeKey(loc.name)
            const description = locationDescriptions[id] || ''

            const poiMatch = POIData.find((poi) => normalizeKey(poi.id) === id) || {}

            return {
                ...loc,
                id,
                description,
                ...poiMatch,
            }
        })

        await fs.writeFile(writePath, JSON.stringify(enrichedLocations, null, 2))

        console.log('createLocationsJSON - done')
    } catch (err) {
        console.error('Error creating locations JSON:', err)
    }
}

let initialized = false

async function init() {
    console.log('rrr')

    if (initialized) return mapLocations
    initialized = true
    try {
        await prepareMapGrid()
        await generateLocationMap()
        await createLocationsJSON()
        console.log('Init completed successfully')
        return mapLocations
    } catch (err) {
        console.error('Init failed:', err)
        return null
    }
}

init()

export { mapGrid, mapLocations, init }
