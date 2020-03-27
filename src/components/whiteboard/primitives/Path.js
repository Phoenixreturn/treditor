import Shape from './Shape'

class Path extends Shape {
    type = 'vPath'
    stroke = 'cyan'
    data = 'M 50 50 L 100 90'
}

export default Path