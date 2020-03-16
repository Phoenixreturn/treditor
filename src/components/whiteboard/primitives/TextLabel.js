import Shape from './Shape'

class TextLabel extends Shape {
    constructor(text, fontSize) {
        super()
        this.text = text
        this.fontSize = fontSize
    }
    type = 'vText'
}

export default TextLabel