// THIS NEEDS TO BE REMOVED AND USEAUDIO USED INSTEAD
export const playAudio = async (fileNameList: string[]) => {
    const audio = new Audio()

    let index = 0

    console.log(fileNameList)

    audio.src = `/sounds/${fileNameList[index]}`
    audio.play()
    index++
    audio.onended = function () {
        if (index < fileNameList.length) {
            audio.src = `/sounds/${fileNameList[index]}`
            audio.play()
            index++
        }
    }
}

export const playRandomAudio = async (fileNameList: string[]) => {
    const audio = new Audio()
    const file = fileNameList[Math.floor(Math.random() * fileNameList.length)]
    audio.src = `/sounds/${file}`
    audio.play()
}
