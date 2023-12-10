import { EasyStar } from '@/assets/a-star'

const easystar = new EasyStar.js()

const grid = [
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
]

easystar.setGrid(grid)

easystar.setAcceptableTiles([0])

easystar.findPath(0, 0, 4, 4, function (path: any) {
    console.log(path)

    if (path === null) {
        alert('Path was not found.')
    } else {
        alert('Path was found. The first Point is ' + path[0].x + ' ' + path[0].y)
    }
})
