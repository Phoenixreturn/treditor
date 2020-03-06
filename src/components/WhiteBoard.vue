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
      </b-button-group>

      <v-stage ref="stageEl" :config="stageSize" @mouseDown="handleStageMouseDown">
        <v-layer ref="layerEl">
            <v-rect v-for="item in rectangles" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
            <v-rect draggable="true" width="100" height="100" fill="blue"></v-rect>
            <v-circle v-for="item in circles" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
            <v-image v-for="item in iamges" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
            <v-transformer ref="transformer" />
        </v-layer>
      </v-stage>
    </div>
</template>

<script>
// import Rectangle from "./primitives/Rectangle";
// import Circle from "./primitives/Circle";
// import Image from "./primitives/Image";

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
            images: []
        }
    },
    methods: {
        handleStageMouseDown() {
        //  // deselect when clicked on empty area
        //   const clickedOnEmpty = e.target === e.target.getStage();
        //   if (clickedOnEmpty) {
        //     selectShape(null);
        //   }
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
            };
            this.circles.push(circ);
        }
    }
}
</script>