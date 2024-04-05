export class Sprite {
    constructor(
        public upscaledSpriteSize: number = 128,
        public spriteX: number = window.innerWidth / 2 - upscaledSpriteSize / 2,
        public spriteY: number = 0,
        public color: string = '#fff'
    ) {
        this.upscaledSpriteSize = upscaledSpriteSize
        this.spriteX = spriteX
        this.spriteY = spriteY
        this.color = color
    }
}