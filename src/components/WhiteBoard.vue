<template>
    <div className="whiteboard">
            <h1>Whiteboard</h1>
        <v-container>
            <v-row :align="centered">
            
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
        <b-button variant="secondary" @click="addLine">
        Line
        </b-button>
      </b-button-group>
            </v-row>
            <v-row no-gutters>
                 

      <v-stage ref="stageEl" :config="stageSize" @mouseDown="handleStageMouseDown">
        <v-layer ref="layerEl">
            <v-rect v-for="item in rectangles" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
            <v-circle v-for="item in circles" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
            <v-image v-for="item in images" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
            <v-text v-for="item in labels" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
            <v-line v-for="item in lines" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
            <v-transformer ref="transformer" />
            <KonvaPolyLine :points="[{x:100,y:100}, {x:140,y:140}, {x:180,y:140}, {x:240,y:90}]"></KonvaPolyLine>
        </v-layer>
      </v-stage>
      <v-treeview :items="items" style="width:500"></v-treeview>
            </v-row>
        </v-container>
     
    </div>
</template>

<script>
import Konva from 'konva';
import Vue from 'vue';
import KonvaPolyLine from './KonvaPolyLine'
// const uuidv1 = require("uuid/v1");

export default {
    name: 'WhiteBoard',
    components: {
        KonvaPolyLine
    },
    data() {
        return {
            items: [
                {
                    id: 1,
                    name: 'Applications :',
                    children: [
                    { id: 2, name: 'Calendar : app' },
                    { id: 3, name: 'Chrome : app' },
                    { id: 4, name: 'Webstorm : app' },
                    ],
                },
            {
                    id: 5,
                    name: 'Documents :',
                    children: [
                    {
                    id: 6,
                    name: 'vuetify :',
                    children: [
                    {
                    id: 7,
                    name: 'src :',
                    children: [
                        { id: 8, name: 'index : ts' },
                        { id: 9, name: 'bootstrap : ts' },
                    ],
                    },
                    ],
            },
            {
            id: 10,
            name: 'material2 :',
            children: [
            {
            id: 11,
            name: 'src :',
            children: [
                { id: 12, name: 'v-btn : ts' },
                { id: 13, name: 'v-card : ts' },
                { id: 14, name: 'v-window : ts' },
            ],
            },
            ],
            },
            ],
            },
            {
            id: 15,
            name: 'Downloads :',
            children: [
            { id: 16, name: 'October : pdf' },
            { id: 17, name: 'November : pdf' },
            { id: 18, name: 'Tutorial : html' },
            ],
            },
            {
            id: 19,
            name: 'Videos :',
            children: [
            {
            id: 20,
            name: 'Tutorials :',
            children: [
            { id: 21, name: 'Basic layouts : mp4' },
            { id: 22, name: 'Advanced techniques : mp4' },
            { id: 23, name: 'All about app : dir' },
            ],
            },
            { id: 24, name: 'Intro : mov' },
            { id: 25, name: 'Conference introduction : avi' },
            ],
            },
            ],
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
            lines: [
                {
                    x: 100,
                    y: 50,
                    points: [73, 70, 340, 23, 450, 60, 500, 20],
                    stroke: 'red',
                    name: 'line1'
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
        addLine() {
            this.buildAnchor(73, 70);
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