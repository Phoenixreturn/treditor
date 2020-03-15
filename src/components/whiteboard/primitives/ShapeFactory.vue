<script>
import Circle from './Circle'
import Rectangle from './Rectangle'
import TextLabel from './TextLabel'

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
        }
    }
}
</script>