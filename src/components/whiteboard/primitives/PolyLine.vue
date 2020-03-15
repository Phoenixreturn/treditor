<template>
    <div class="polyLine">
        <v-line v-for="item in lines" :key="item.id" :config="item"/>     
    </div>
</template>

<script>

import Vue from 'vue'

export default {
    name: "PolyLine",
    props: {
        points: {
            type: Array,
            default: function () { return [] }
        }
    },
    created() {
        this.$props.points.forEach(element => { 
            this.$data.anchors.push(this.buildAnchor(element, this.$parent));
        });

        this.buildLines()
    },
    data() {
        return {
            lines: [
            ],
            anchors: [

            ]
        }
    },
    methods: {
        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        },
        buildLines() {         
        this.lines = []
         var firstAnchor;
        this.$data.anchors.forEach(element => {
            if (!firstAnchor) {
                firstAnchor = element;
            } else {
                const line =  {
                    points: [firstAnchor.getNode().x(), firstAnchor.getNode().y(), element.getNode().x(), element.getNode().y()],
                    stroke: 'green',
                    id: `line${this.lines.length + 1}`,
                    name: `line${this.lines.length + 1}`,
                };
                this.lines.push(line);
                firstAnchor = element;
            }
            
        })
           
        },
        buildAnchor(point, layer) {
           var kCircle = Vue.component('vCircle');

            var anchor = new kCircle({
                propsData: {
                    config: {
                        x: point.x,
                        y: point.y,
                        radius: 8,
                        stroke: '#666',
                        fill: 'green',
                        strokeWidth: 2,
                        draggable: true 
                    },
                    key: `cirlce${this.lines.length + 1}`,
                }
            });
            // add hover styling
            anchor.getNode().on('mouseover', function() {
                document.body.style.cursor = 'pointer';
                this.strokeWidth(4);
                layer.getNode().draw();
            });
            anchor.getNode().on('mouseout', function() {
                document.body.style.cursor = 'default';
                this.strokeWidth(2);
                layer.getNode().draw();
            });

            var ctxLine = this;
            anchor.getNode().on('dragend', function() {
               ctxLine.buildLines()
            });

            layer.getNode().add(anchor.getNode());
            layer.getNode().draw();

            return anchor;
        },
    }
}
</script>