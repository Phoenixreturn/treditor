import { v1 as uuidv1 } from 'uuid';

class Shape {
    id = uuidv1()
    name = 'shape' + uuidv1()
    x = this.getRandomInt(100)
    y = this.getRandomInt(100)
    rotation = 0
    scaleX =  1
    scaleY = 1
    width = this.getRandomInt(100)
    height = this.getRandomInt(100)
    fill = 'red'
    draggable = true    

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

export default Shape;