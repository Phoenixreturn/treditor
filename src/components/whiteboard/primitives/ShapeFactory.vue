<script>
import Circle from './Circle'
import Rectangle from './Rectangle'
import TextLabel from './TextLabel'
import Path from './Path'

export default {
    name: 'ShapeFactory',
    methods: {
        createShape(e) {
            switch(e) {
                case 'circle':
                    return this.createCircle();
                case 'rectangle':
                    return this.createRectangle();
                case 'textLabel':
                    return this.createTextLabel();
                case 'path':
                    return this.createPath();
                default:
                    return this.createRectangle();
            }
        },
        createRectangle() {
            var rectangle = new Rectangle()

            return rectangle
        },
        createPolyLine() {
                // <!-- points: [{x:100,y:100}, {x:140,y:140}, {x:180,y:140}, {x:240,y:90}] -->
        },
        createTextLabel() {
            var label = new TextLabel('label', 20)

            return label
        },
        createCircle() {
            var circle = new Circle()

            return circle
        },
        createPath() {
            var path = new Path()

            return path
        }
    }
}
</script>