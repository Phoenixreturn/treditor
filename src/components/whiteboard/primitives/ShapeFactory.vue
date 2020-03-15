<script>
import Vue from 'vue'
import Circle from './Circle'
import Rectangle from './Rectangle'
import PolyLine from './PolyLine'
import TextLabel from './TextLabel'

export default {
    name: 'ShapeFactory',
    methods: {
        createRectangle() {
            var ComponentClass = Vue.extend(Rectangle)
            var rectangle = new ComponentClass();

            return rectangle;
        },
        createPolyLine() {
                // <!-- points: [{x:100,y:100}, {x:140,y:140}, {x:180,y:140}, {x:240,y:90}] -->
        },
        createTextLabel() {

        },
        createCircle() {
            // var circle = new Circle({
            //     propsData: {
            //     config: {
            //         x: point.x,
            //         y: point.y,
            //         radius: 8,
            //         stroke: '#666',
            //         fill: 'green',
            //         strokeWidth: 2,
            //         draggable: true,
            //         x: this.getRandomInt(100),
            //         y: this.getRandomInt(100),
            //         width: 100,
            //         height: 100,
            //         scaleX: 1,
            //         scaleY: 1,
            //         fill: "red",
            //         draggable: true,
            //         id: `rect${this.rectangles.length + 1}`,
            //         name: `rect${this.rectangles.length + 1}`,
            //     },
            //     key: `cirlce${this.lines.length + 1}`,
            //     }
            // });

            // return circle;
        }
    }
}
</script>