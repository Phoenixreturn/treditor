import Shape from './Shape'

class NonCircle extends Shape {
    width = this.getRandomInt(100)
    height = this.getRandomInt(100)
}

export default NonCircle;