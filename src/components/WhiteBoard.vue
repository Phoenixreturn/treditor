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

      <v-stage ref="stageEl" @mouseDown="handleStageMouseDown">
        <v-layer ref="layerEl">
            <v-rect v-for="item in rectangles" :key="item.id" :config="item" @transformend="handleTransformEnd"/>
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
            rectangles: [],
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
            //  const rect = {
            // x: this.getRandomInt(100),
            // y: this.getRandomInt(100),
            // width: 100,
            // height: 100,
            // fill: "red",
            // id: `rect${rectangles.length + 1}`,
            // };
            // const rects = rectangles.concat([rect]);
            // setRectangles(rects);
            // const shs = shapes.concat([`rect${rectangles.length + 1}`]);
            // setShapes(shs);
        },
        addCircle() {
            //  const circ = {
            // x: this.getRandomInt(100),
            // y: this.getRandomInt(100),
            // width: 100,
            // height: 100,
            // fill: "red",
            // id: `circ${circles.length + 1}`,
            // };
            // const circs = circles.concat([circ]);
            // setCircles(circs);
            // const shs = shapes.concat([`circ${circles.length + 1}`]);
            // setShapes(shs);
        }
    }
}
</script>