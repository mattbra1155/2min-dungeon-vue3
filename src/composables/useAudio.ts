// src/composables/useAudio.ts
import { ref } from 'vue'

export const useAudio = () => {
    const isPlaying = ref(false) // Track if audio is playing

    const playAudio = async (fileNameList: string[]): Promise<void> => {
        if (fileNameList.length === 0) return

        let index = 0
        const audio = new Audio()

        const playNext = () => {
            if (index < fileNameList.length) {
                audio.src = `/sounds/${fileNameList[index]}`
                audio.load() // Ensure it's preloaded on mobile devices
                audio.play().catch((e) => {
                    console.error('Playback failed:', e)
                    isPlaying.value = false // Handle failed play
                })
                index++
            } else {
                isPlaying.value = false
            }
        }

        audio.onended = playNext

        // Start playing the first audio
        isPlaying.value = true
        playNext()
    }

    const playRandomAudio = async (fileNameList: string[]): Promise<void> => {
        if (fileNameList.length === 0) return

        const file = fileNameList[Math.floor(Math.random() * fileNameList.length)]
        const audio = new Audio(`/sounds/${file}`)

        try {
            isPlaying.value = true
            await audio.play()
            audio.onended = () => {
                isPlaying.value = false
            }
        } catch (error) {
            console.error('Playback failed:', error)
            isPlaying.value = false // Handle failed play
        }
    }

    return { playAudio, playRandomAudio, isPlaying }
}
