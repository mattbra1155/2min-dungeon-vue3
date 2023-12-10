const writeAnimation = (text: string) => {
    let i = 0
    const txt = text
    const speed = 50
    let words = ''

    function typeWriter() {
        if (i < txt.length) {
            words += txt.charAt(i)
            i++
            setTimeout(typeWriter, speed)
        }
    }

    typeWriter()
}
