<template>
    <div className="whiteboard">
      <h1>Whiteboard</h1>
      <b-button-group>
        <b-button variant="secondary" @click="addRectangle">
          Rectangle
        </b-button>
        <b-button variant="secondary" @click="addCircle">
          Circle
        </b-button>
         <b-button variant="secondary" @click="addText">
          Label
        </b-button>
      </b-button-group>

      <v-stage ref="stageEl" :config="stageSize" @mouseDown="handleStageMouseDown">
        <v-layer ref="layerEl">
            <v-rect v-for="item in rectangles" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
            <v-circle v-for="item in circles" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
            <v-image v-for="item in images" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
            <v-text v-for="item in labels" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
            <v-transformer ref="transformer" />
        </v-layer>
      </v-stage>
    </div>
</template>

<script>
// import Rectangle from "./primitives/Rectangle";
// import Circle from "./primitives/Circle";
// import Image from "./primitives/Image";
import Konva from 'konva';
// const uuidv1 = require("uuid/v1");

export default {
    name: 'WhiteBoard',
    data() {
        return {
            stageSize: {
                width: 500,
                height: 500
            },    
            rectangles: [
                {
                    rotation: 0,
                    x: 10,
                    y: 10,
                    width: 100,
                    height: 100,
                    scaleX: 1,
                    scaleY: 1,
                    fill: 'red',
                    name: 'rect1',
                    draggable: true
                }
            ],
            circles: [],
            images: [],
            labels: [
                {
                    text: "type here",
                    x: 50,
                    y: 80,
                    fontSize: 20,
                    draggable: true,
                    width: 200,
                    name: 'text1'
                }
            ],
            selectedShapeName: ''
        }
    },
    methods: {
        handleTransformEnd(e) {
            // shape is transformed, let us save new attrs back to the node
            // find element in our state
            const rect = this.rectangles.find(r => r.name === this.selectedShapeName);
            // update the state
            rect.x = e.target.x();
            rect.y = e.target.y();
            rect.rotation = e.target.rotation();
            rect.scaleX = e.target.scaleX();
            rect.scaleY = e.target.scaleY();

            // change fill
            rect.fill = Konva.Util.getRandomColor();
        },
        handleStageMouseDown(e) {
            // clicked on stage - clear selection
            if (e.target === e.target.getStage()) {
                this.selectedShapeName = '';
                this.updateTransformer();
                return;
            }

            // clicked on transformer - do nothing
            const clickedOnTransformer =
            e.target.getParent().className === 'Transformer';
            if (clickedOnTransformer) {
              return;
            }

            // find clicked rect by its name
            const name = e.target.name();
            const rect = this.rectangles.find(r => r.name === name);
            if (rect) {
                this.selectedShapeName = name;
            } else {
                const circ = this.circles.find(r => r.name === name);
                if (circ) {
                    this.selectedShapeName = name;
                } else {
                    const txt = this.labels.find(r => r.name === name);
                    if (txt) {
                        this.selectedShapeName = name;
                    } else {
                        this.selectedShapeName = '';
                    }                    
                }                
            }
            this.updateTransformer();
        },
        updateTransformer() {
            // here we need to manually attach or detach Transformer node
            const transformerNode = this.$refs.transformer.getNode();
            const stage = transformerNode.getStage();
            const { selectedShapeName } = this;

            const selectedNode = stage.findOne('.' + selectedShapeName);
            // do nothing if selected node is already attached
            if (selectedNode === transformerNode.node()) {
                return;
            }

            if (selectedNode) {
                 // attach to another node
                transformerNode.attachTo(selectedNode);
            } else {
                // remove transformer
                transformerNode.detach();
            }
            transformerNode.getLayer().batchDraw();
        },
        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        },
        addRectangle() {
            const rect = {
                x: this.getRandomInt(100),
                y: this.getRandomInt(100),
                width: 100,
                height: 100,
                scaleX: 1,
                scaleY: 1,
                fill: "red",
                draggable: true,
                id: `rect${this.rectangles.length + 1}`,
                name: `rect${this.rectangles.length + 1}`,
            };
            this.rectangles.push(rect);
            // this.$refs.layerEl.
            console.log("Add rectangle");
        },
        addCircle() {
            const circ = {
                x: this.getRandomInt(100),
                y: this.getRandomInt(100),
                width: 100,
                height: 100,
                fill: "green",
                draggable: true,
                id: `circ${this.circles.length + 1}`,
                name: `circ${this.circles.length + 1}`,
            };
            this.circles.push(circ);
        },
        addText() {
            const text = {
                x: this.getRandomInt(100),
                y: this.getRandomInt(100),
                width: 200,
                height: 100,
                fill: "orange",
                draggable: true,
                text: `text${this.labels.length + 1}`,
                id: `text${this.labels.length + 1}`,
                name: `text${this.labels.length + 1}`,
            }
            this.labels.push(text);
        }
    }
}
</script>