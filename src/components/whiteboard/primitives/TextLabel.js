import NonCircle from './NonCircle'

class TextLabel extends NonCircle {
    constructor(text, fontSize) {
        super()
        this.text = text
        this.fontSize = fontSize
    }
    type = 'vText'
}

export default TextLabel