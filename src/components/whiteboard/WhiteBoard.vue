<template>
    <v-container fluid class="ma-0">
        <v-row align="center" justify="center">
                <TopPanel @create="createComponent"></TopPanel>
        </v-row>

        <v-row>
            <v-col    v-if='items1.length > 0'>   <v-card>
               
      <v-tabs
        v-model="tab"
        background-color="primary"
        dark
     
      >
        <v-tab
          v-for="item in items1"
          :key="item.tab"
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>
  
      <v-tabs-items v-model="tab">
   
     
        <v-tab-item
          v-for="item in items1"
          :key="item.tab"
        >    <draggable v-model="items1" :move="onMove" :options='{group: "people"}'> 
        <transition-group> 
           <component  v-bind:is="item.type"  :key="item.tab" :objProps="item.objProps"></component>
   </transition-group>
      </draggable>
        </v-tab-item>
     
      </v-tabs-items>
          
    </v-card></v-col>
            <v-col @contextmenu.capture.prevent fluid>
                <v-menu v-model="showMenu" absolute offset-y style="max-width: 600px">
                    <template v-slot:activator="{ on }">
                        <v-stage
                            ref="stageEl"
                            :config="stageSize"
                            @mouseDown="handleStageMouseDown"
                            @transformend="handleTransformEnd"
                            @click="customFunct($event, on)"
                            style="background: #dfffff"
                        >
                            <v-layer ref="layerEl">
                                <v-transformer ref="transformer" />
                            </v-layer>
                        </v-stage>
                    </template>

                    <v-list>
                        <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            @click="handleListClick(item.title)()">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
             <draggable v-model="items1" :move="onMove" :options='{group: "people"}'>
        <transition-group>
              <component v-for="el in items1" v-bind:is='el.type'  v-bind="el.objProps" v-bind:key="el.id"></component>
           </transition-group>
      </draggable>
        </v-col>

        <v-col>
       <draggable v-model="items2" :move="onMove" :options='{group: "people"}'>
        <transition-group>
              <component v-for="el in items2" v-bind:is='el.type'  v-bind="el.objProps" v-bind:key="el.id"></component>
           </transition-group>
      </draggable>
                
                
        </v-col>
      </v-row>
    </v-container>
  
</template>

<script>
import Vue from "vue";
import Konva from "konva";
import axios from "axios";
import TopPanel from "./TopPanel";
import StubTab from "./StubTab";
import PropertiesPanel from "./PropertiesPanel";
import ShapeFactory from "./primitives/ShapeFactory";
import draggable from 'vuedraggable'

export default {
  name: "WhiteBoard",
  // created: function() {
  //     axios.get('http://192.168.0.103:8080/springtest/primitives').then(function(response) {
  //     }.bind(this))
  //     .catch(e => {
  //         this.errors.push(e);
  //     })
  // },
  components: {
    TopPanel,
    PropertiesPanel,
    draggable,
    StubTab
  },
  data() {
    return {
      selectedObj: {},
      color: "#59c7f9",
      suckerCanvas: null,
      suckerArea: [],
      isSucking: false,
      shapes: [],
      errors: [],
      editable: true,
      showMenu: false,
      propertiesType: 'PropertiesPanel',
      items: [{ title: "Start to Draw Line" }, { title: "End to Draw Line" }],
      gridSize: 40,
      stageSize: {
        width: 500,
        height: 500
      },
       tab: null,
      items1: [
        { tab: 'One', id: 'One', objProps: { content: 'Tab 1 Content' }, type: 'StubTab' },
        { tab: 'Two', id: 'Two', objProps: { content: 'Tab 2 Content' }, type: 'StubTab' },
        { tab: 'Three', id: 'Three', objProps: { content: 'Tab 3 Content' }, type: 'StubTab' },
      ],
      items2: [
            { tab: 'Four', id: 'Four', objProps: {}, type: 'PropertiesPanel' },
      ]
    };
  },
  computed: {
    propTab() {
      return { currentObject: this.selectedObj, items: this.shapes };
    },
     dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
  },
  watch: {
    selectedObj: function(val) {
      this.selectedObj = val
      this.items2[0].objProps = this.propTab;
    }
  },
  created: function() {
    this.items2[0].objProps = this.propTab;
  },
  mounted: function() {
      console.log(this.$vuetify.breakpoint)
    var gridLayer = new Konva.Layer();
    var padding = this.gridSize;
    console.log(this.stageSize.width, padding, this.stageSize.width / padding);
    for (var i = 0; i < this.stageSize.width / padding; i++) {
      gridLayer.add(
        new Konva.Line({
          points: [
            Math.round(i * padding) + 0.5,
            0,
            Math.round(i * padding) + 0.5,
            this.stageSize.height
          ],
          stroke: "#ddd",
          strokeWidth: 2
        })
      );
    }

    gridLayer.add(new Konva.Line({ points: [0, 0, 10, 10] }));
    for (var j = 0; j < this.stageSize.height / padding; j++) {
      gridLayer.add(
        new Konva.Line({
          points: [
            0,
            Math.round(j * padding),
            this.stageSize.width,
            Math.round(j * padding)
          ],
          stroke: "#ddd",
          strokeWidth: 2
        })
      );
    }
    this.$refs.stageEl.getNode().add(gridLayer);
    gridLayer.moveToBottom();
    gridLayer.draw();
  },
  methods: {
     onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    customFunct(e, on) {
      on["click"](e.evt);
    },
    handleListClick(item) {
      var kShape = Vue.component("vLine");
      const line = {
        stroke: "green",
        id: `line123`,
        name: `line123`
      };
      var anchor = new kShape({
        propsData: {
          config: line,
          key: line.id
        }
      });
      this.$refs.layerEl.getNode().add(anchor.getNode());
      anchor.$parent = this.$refs.layerEl;
      anchor.getNode().on("transformend", this.handleTransformEnd);
      anchor.getNode().on("dragend", e => {
        anchor.getNode().position({
          x: this.getGridSize(anchor.getNode().x()),
          y: this.getGridSize(anchor.getNode().y())
        });
        this.$refs.stageEl.getNode().batchDraw();
      });
        anchor.$mount();
        var self = this;
    return function() {
    if (item === "Start to Draw Line") {
          var startPoint = self.$refs.stageEl.getNode().getPointerPosition();
          self.$refs.stageEl.getNode().on("mousemove", self.drawLineMouseMove(startPoint, anchor.getNode()));
        } else if (item === "End to Draw Line") {
          self.$refs.stageEl.getNode().off("mousemove");
          console.log(item);
        }
    }
     
    },
    drawLineMouseMove(startPoint, line) {  
        var self = this   
        return function(e) {
            var endPoint = self.$refs.stageEl.getNode().getPointerPosition();
            var pp = [];
            pp.push(startPoint.x)
            pp.push(startPoint.y)
            pp.push(endPoint.x)
            pp.push(endPoint.y)
            line.points(pp)
            self.$refs.layerEl.getNode().draw();
            console.log(e)
        }
    },
    handleTransformEnd(e) {
      if (this.selectedObj) {
        this.selectedObj.x = this.getGridSize(e.target.attrs.x);
        this.selectedObj.y = this.getGridSize(e.target.attrs.y);
        this.selectedObj.height = this.getGridSize(e.target.attrs.height);
        this.selectedObj.width = this.getGridSize(e.target.attrs.width);
        this.selectedObj.rotation = this.getGridSize(e.target.attrs.rotation);
        // this.selectedObj.scaleX = this.getGridSize(e.target.attrs.scaleX);
        // this.selectedObj.scaleY = this.getGridSize(e.target.attrs.scaleY);
        // rect.fill = Konva.Util.getRandomColor();
      }
    },
    getGridSize(x) {
      return Math.round(x / this.gridSize) * this.gridSize;
    },
    createComponent(e) {
      var factory = Vue.extend(ShapeFactory);
      var shape = new factory().createShape(e);
      this.shapes.push(shape);
      var kShape = Vue.component(shape.type);

      var anchor = new kShape({
        propsData: {
          config: shape,
          key: shape.id
        }
      });
      this.$refs.layerEl.getNode().add(anchor.getNode());
      anchor.$parent = this.$refs.layerEl;
      anchor.getNode().on("transformend", this.handleTransformEnd);
      anchor.getNode().on("dragend", e => {
        anchor.getNode().position({
          x: this.getGridSize(anchor.getNode().x()),
          y: this.getGridSize(anchor.getNode().y())
        });
        this.$refs.stageEl.getNode().batchDraw();
      });

      anchor.$mount();
      this.$refs.layerEl.getNode().draw();
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedObj = {};
        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === "Transformer";
      if (clickedOnTransformer) {
        return;
      }

      // find clicked rect by its name
      const name = e.target.name();
      const shape = this.shapes.find(shape => shape.name === name);
      if (shape) {
        this.selectedObj = shape;
      } else {
        this.selectedObj = {};
      }
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();

      const selectedNode = stage.findOne("." + this.selectedObj.name);
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
    }
  }
};
</script>