<template>
  <v-container fill-height fluid class="ma-0 pa-0">
    <v-row align="center" class="ma-0 pa-0 ttttttt firstRow">      
      <TopPanel @create="createComponent"></TopPanel>        
    </v-row>
    <v-row class="ma-0 pa-0 ttttttt" style="height:92%">
      <v-col class="ma-0 pa-0" v-if="items1.length > 0" :cols="2">
        <v-card>
          <v-tabs v-model="tab" background-color="primary" dark>
            <v-tab v-for="item in items1" :key="item.tab">{{ item.tab }}</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items1" :key="item.tab">
              <draggable
                v-model="items1"
                v-bind="{ghostClass: 'movClass'}"
                @start="showCurtain"
                :move="checkMove"
                :options="{group: 'people'}"
              >
                <transition-group>
                  <component v-bind:is="item.type" :key="item.tab" :objProps="item.objProps"></component>
                </transition-group>
              </draggable>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
      <v-col @contextmenu.capture.prevent class="ma-0 pa-0" :cols="stageColSize">
        <v-menu v-model="showMenu" absolute offset-y>
          <template v-slot:activator="{ on }">
            <v-stage
              ref="stageEl"
              :config="stageSize"
              @dblclick="handleStageMouseDown"
              @transformend="handleTransformEnd"
              @mousedown="startCreating($event)"
              @mousemove="whileCreating($event)"
              @mouseup="endCreating($event)"
              @click="eventHandlerContextMenu($event, on)"
              style="background: #dfffff; height:100%"
            >
              <v-layer ref="layerEl">
                <component v-for="shape in shapes" 
                           v-bind:is=shape.type
                           v-bind:key=shape.id
                           ref='shapes'
                           v-bind:config=shape
                           @dblclick="handleStageMouseDown"
                           @transformEnd="handleTransformEnd"
                           @dragend="dragEndEvent"
                           @dragstart="dragStartEvent"></component>
                <v-transformer ref="transformer" />
              </v-layer>
            </v-stage>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" @click="handleListClick(item.title)()">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col class="ma-0 pa-0" :cols="2" v-show="items2.length > 0">
        <draggable
          v-model="items2"
          v-bind="{ghostClass: 'movClass'}"
          @start="showCurtain"
          @end="displayValue='none'"
          :move="checkMove"
          :options="{group: 'people'}"
        >
          <transition-group>
            <component v-for="el in items2" v-bind:is="el.type" v-bind="el.objProps" v-bind:key="el.id"></component>
          </transition-group>
        </draggable>
      </v-col>
    </v-row>

    <div class="blackout" v-bind:style="{ display: displayValue, opacity: opacityValue }">
      <draggable v-model="items1" :options="{group: 'people'}" :move="checkMove" style="margin: 10%">
        <v-btn id="leftBtn" icon width="200" height="200">
          <LeftArrow style="width:200px;height:200px;transform:rotate(180deg)"></LeftArrow>
        </v-btn>
      </draggable>

      <v-btn id="rightBtn" style="margin: 10%" icon width="200" height="200">
        <RightArrow style="width:200px;height:200px"></RightArrow>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import Vue from "vue"
import Konva from "konva"
import axios from "axios"
import TopPanel from "./TopPanel"
import StubTab from "./StubTab"
import PropertiesPanel from "./PropertiesPanel"
import ShapeFactory from "./primitives/ShapeFactory"
import draggable from "vuedraggable"
import LeftArrow from "../../assets/left_arrow.svg"
import RightArrow from "../../assets/right_arrow.svg"

import UserService from '../../services/user.service'
import WhiteBoardService from '../../services/whiteboard.service'

import operations from '../../store/operation.types'
import primitives from './primitives/primitive.type'

export default {
  name: "WhiteBoard",
  components: {
    TopPanel,
    PropertiesPanel,
    draggable,
    StubTab,
    LeftArrow,
    RightArrow
  },
  data() {
    return {
      selectedObj: null,
      content: '### stub ###',
      color: "#59c7f9",
      suckerCanvas: null,
      gridLayer: null,
      suckerArea: [],
      isSucking: false,
      shapes: [],
      displayValue: "none",
      opacityValue: "60%",
      editable: true,
      showMenu: false,
      propertiesType: "PropertiesPanel",
      items: [
        {
          title: "Start to Draw Line"
        },
        {
          title: "End to Draw Line"
        }
      ],
      gridSize: 40,
      stageSize: {
        width: 500,
        height: 500
      },
      tab: null,
      items1: [
        {
          tab: "One",
          id: "One",
          objProps: {
            content: "Tab 1 Content"
          },
          type: "StubTab"
        },
        {
          tab: "Two",
          id: "Two",
          objProps: {
            content: "Tab 2 Content"
          },
          type: "StubTab"
        },
        {
          tab: "Three",
          id: "Three",
          objProps: {
            content: "Tab 3 Content"
          },
          type: "StubTab"
        }
      ],
      items2: [
        {
          tab: "Four",
          id: "Four",
          objProps: {},
          type: "PropertiesPanel"
        }
      ]
    }
  },
  computed: {
    stageColSize() {
      var col = 8
      if (this.items1.length == 0) {
        col += 2
      }

      if (this.items2.length == 0) {
        col += 2
      }

      return col
    },
    propTab() {
      return {
        currentObject: this.selectedObj,
        items: this.shapes
      }
    },
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      }
    }
  },
  watch: {
    selectedObj: function(val) {
      this.selectedObj = val
      this.items2[0].objProps = this.propTab
    }
  },
  created: function() {
    this.items2[0].objProps = this.propTab
  },
  mounted: function() {
    var this_ptr = this;
    this.$root.$on('openProject', data => {
      console.log('opened project ########################################')
    })

    this.$root.$on('saveProject', (data) => {
      console.log('saved project ########################')
      WhiteBoardService.saveProject(this_ptr.shapes);
    })
      UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        console.log("UserService ####")
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
      );
    this.$nextTick(() => {
      let this_ptr = this;
      window.addEventListener("resize", () => {
        const height = this_ptr.$refs.stageEl.$el.clientHeight
        const width = this_ptr.$refs.stageEl.$el.clientWidth
        this_ptr.stageSize.width = width
        this_ptr.stageSize.height = height
        this_ptr.gridLayer.draw()
        console.log("############### Window resize event #######################")
      })
    })
  },
  updated: function() {
    this.$nextTick(function() {
      const height = this.$refs.stageEl.$el.clientHeight
      const width = this.$refs.stageEl.$el.clientWidth
      this.stageSize.width = width
      this.stageSize.height = height
      this.$refs.stageEl.getNode().width(this.stageSize.width)
      this.$refs.stageEl.getNode().height(this.stageSize.height)
      if (this.gridLayer != null) {
        this.gridLayer.removeChildren()        
      } else {
        this.gridLayer = new Konva.Layer()
        this.$refs.stageEl.getNode().add(this.gridLayer)
        this.gridLayer.moveToBottom()
      }
      var padding = this.gridSize
      console.log(this.stageSize.width, padding, this.stageSize.width / padding)
      for (var i = 0; i < this.stageSize.width / padding; i++) {
        this.gridLayer.add(
          new Konva.Line({
            points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, this.stageSize.height],
            stroke: "#ddd",
            strokeWidth: 2
          })
        )
      }

      this.gridLayer.add(
        new Konva.Line({
          points: [0, 0, 10, 10]
        })
      )
      for (var j = 0; j < this.stageSize.height / padding; j++) {
        this.gridLayer.add(
          new Konva.Line({
            points: [0, Math.round(j * padding), this.stageSize.width, Math.round(j * padding)],
            stroke: "#ddd",
            strokeWidth: 2
          })
        )
      }      
      this.gridLayer.draw()
    })
  },
  methods: {
    changeCurtain() {
      this.displayValue = "none"
    },
    showCurtain() {
      this.displayValue = "flex"
    },
    checkMove(evt) {
      return true
    },
    eventHandlerContextMenu(event, on) {
      // это нужно каким то боком нужно для контекстного меню
      on["click"](event.evt)
    },
    startCreating(event) {
      console.log('startCreating')
      if (this.$store.state.event.type == operations.CREATE) {        
        if (this.$store.state.event.primitive == primitives.RECTANGLE 
              || this.$store.state.event.primitive == primitives.CIRCLE) {
          this.$store.state.event.type = operations.CREATING
          this.$store.state.event.startPoint.x = event.evt.layerX
          this.$store.state.event.startPoint.y = event.evt.layerY
          return
        }
        this.createComponent(this.$store.state.event.primitive, event.evt.layerX, event.evt.layerY);
      }  
    },
    whileCreating(event) {
      console.log('whileCreating')
      if (this.$store.state.event.type == operations.CREATING) {
        let startX = this.$store.state.event.startPoint.x
        let startY = this.$store.state.event.startPoint.y
        let initWidth = event.evt.layerX -  startX
        let initHeight = event.evt.layerY - startY
        if (Math.abs(initWidth) >= 2 || Math.abs(initHeight) >= 2) {
          if (this.$store.state.event.createdPrimitve === null) {
            this.$store.state.event.createdPrimitve = 
              this.createComponent(this.$store.state.event.primitive, startX, startY)
          }    
          if (this.$store.state.event.primitive == primitives.RECTANGLE) {
            this.$set(this.$store.state.event.createdPrimitve, 'width', initWidth)
            this.$set(this.$store.state.event.createdPrimitve, 'height', initHeight)
          } else if (this.$store.state.event.primitive == primitives.CIRCLE) {
            let rad = Math.max(Math.abs(initWidth), Math.abs(initHeight))
            this.$set(this.$store.state.event.createdPrimitve, 'radius', rad)
          }
          
        }
      }
    },
     endCreating(event) {
      console.log('endCreating')
      if (this.$store.state.event.type == operations.CREATING) {
        let startX = this.$store.state.event.startPoint.x
        let startY = this.$store.state.event.startPoint.y
        let finalWidth = event.evt.layerX - startX
        let finalHeight = event.evt.layerY - startY
        if (this.$store.state.event.primitive == primitives.RECTANGLE) {
            this.$set(this.$store.state.event.createdPrimitve, 'width', finalWidth)
            this.$set(this.$store.state.event.createdPrimitve, 'height', finalHeight)
        } else if (this.$store.state.event.primitive == primitives.CIRCLE) {
            let rad = Math.max(Math.abs(finalWidth), Math.abs(finalHeight))
            this.$set(this.$store.state.event.createdPrimitve, 'radius', rad)
        }
        this.$store.state.event.createdPrimitve = null        
        this.$store.state.event.type = operations.CREATE
      }      
    },
    handleListClick(item) {
      var kShape = Vue.component("vLine")
      const line = {
        stroke: "green",
        id: `line123`,
        name: `line123`
      }
      var anchor = new kShape({
        propsData: {
          config: line,
          key: line.id
        }
      })
      this.$refs.layerEl.getNode().add(anchor.getNode())
      anchor.$parent = this.$refs.layerEl
      anchor.getNode().on("transformend", this.handleTransformEnd)
      anchor.getNode().on("dragend", e => {
        anchor.getNode().position({
          x: this.getGridSize(anchor.getNode().x()),
          y: this.getGridSize(anchor.getNode().y())
        })
        this.$refs.stageEl.getNode().batchDraw()
      })
      anchor.$mount()
      var self = this
      return function() {
        if (item === "Start to Draw Line") {
          var startPoint = self.$refs.stageEl.getNode().getPointerPosition()
          self.$refs.stageEl.getNode().on("mousemove", self.drawLineMouseMove(startPoint, anchor.getNode()))
        } else if (item === "End to Draw Line") {
          self.$refs.stageEl.getNode().off("mousemove")
          console.log(item)
        }
      }
    },
    drawLineMouseMove(startPoint, line) {
      var self = this
      return function(e) {
        var endPoint = self.$refs.stageEl.getNode().getPointerPosition()
        var pp = []
        pp.push(startPoint.x)
        pp.push(startPoint.y)
        pp.push(endPoint.x)
        pp.push(endPoint.y)
        line.points(pp)
        self.$refs.layerEl.getNode().draw()
        console.log(e)
      }
    },
    handleTransformEnd(e) {
      if (this.selectedObj) {
        this.selectedObj.x = this.getGridSize(e.target.attrs.x)
        this.selectedObj.y = this.getGridSize(e.target.attrs.y)
        if (this.selectedObj.type !== 'vCircle') {
          this.selectedObj.width = this.getGridSize(e.target.attrs.width)
          this.selectedObj.height = this.getGridSize(e.target.attrs.height)
        } else {
          this.$refs.layerEl.getNode().clear()
          this.$refs.layerEl.getNode().draw()
        }
        this.selectedObj.rotation = this.getGridSize(e.target.attrs.rotation)
        // this.selectedObj.scaleX = this.getGridSize(e.target.attrs.scaleX);
        // this.selectedObj.scaleY = this.getGridSize(e.target.attrs.scaleY);
        // rect.fill = Konva.Util.getRandomColor();
      }
    },
    getGridSize(x) {
      return Math.round(x / this.gridSize) * this.gridSize
    },
    createComponent(e, x, y) {
      var factory = Vue.extend(ShapeFactory)
      var shape = new factory().createShape(e)
      shape.x = x;
      shape.y = y;
      this.shapes.push(shape)
      return shape
    },
    dragStartEvent(e) {
      console.log('dragStartEvent')
      if (!e.evt.ctrlKey) {
          e.target.stopDrag();
        }
    },
    dragEndEvent(e) {
      console.log('dragEndEvent' )
    //   anchor.getNode().position({
      //     x: this.getGridSize(anchor.getNode().x()),
      //     y: this.getGridSize(anchor.getNode().y())
      //   })
      //   this.$refs.stageEl.getNode().batchDraw()
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedObj = {};
        this.updateTransformer()
        return
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer = e.target.getParent().className === "Transformer"
      if (clickedOnTransformer) {
        return
      }

      // find clicked rect by its name
      const name = e.target.name()
      const shape = this.shapes.find(shape => shape.name === name)
      if (shape) {
        this.selectedObj = shape
      } else {
        this.selectedObj = {}
      }
      this.updateTransformer()
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode()
      const stage = transformerNode.getStage()

      const selectedNode = stage.findOne("." + this.selectedObj.name)
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.attachTo(selectedNode)
      } else {
        // remove transformer
        transformerNode.detach()
      }
      transformerNode.getLayer().batchDraw()
    }
  }
}
</script>

<style scoped>
.ghostClass {
  z-index: 101;
  background: red;
}
.blackout {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  background-color: black;
  width: 100vw;
  z-index: 100;
  justify-content: space-between;
  align-items: center;
}
.ttttttt {
  align-self: stretch;
  width: 100%;
}

.firstRow {
  height: 8%;
  background-color: lightsteelblue;
}
</style>