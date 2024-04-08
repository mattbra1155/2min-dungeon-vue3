export const playAudio = async (fileNameList: string[]) => {
    // NOTE TO SELF: this could be a audio STORE with array of audi play one after another
    let isPlaying = false

    const file = fileNameList[Math.floor(Math.random() * fileNameList.length)]
    const audio = new Audio(`sounds/${file}.wav`)
    await audio.play()
    isPlaying = true
    // audio.addEventListener('ended', (e) => {
    //     console.log(e)
    //     isPlaying = false
    //     console.log(isPlaying)
    // })
}
