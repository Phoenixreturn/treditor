<template>
    <div className="whiteboard">
        <h1>Whiteboard</h1>
        <v-container >

            <v-row align="center" justify="center">
                <TopPanel @create='createComponent'></TopPanel>
            </v-row>

            <v-row>
                <v-col @contextmenu.capture.prevent>
                    <v-menu
                        v-model="showMenu"
                        absolute
                        offset-y
                        style="max-width: 600px"
                    >
                        <template v-slot:activator="{ on }">                           
                            <v-stage ref="stageEl" :config="stageSize" @mouseDown="handleStageMouseDown" @transformend="handleTransformEnd" 
                                @click='customFunct($event, on)' style="background: #dfffff">
                                <v-layer ref="layerEl">         
                                    <v-transformer ref="transformer" />                     
                                </v-layer>
                            </v-stage> 
                        </template>
  
                    <v-list>
                    <v-list-item
                        v-for="(item, index) in items"
                        :key="index">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                    </v-list>
                  

                    </v-menu>
                      
                   
                </v-col>

                <v-col>
                    <PropertiesPanel :currentObject='selectedObj' 
                                     :items='shapes'></PropertiesPanel>
                </v-col>
                  
            </v-row>

        </v-container>     
    </div>
</template>

<script>
import Vue from 'vue'
import Konva from 'konva'
import axios from 'axios'
import TopPanel from './TopPanel'
import PropertiesPanel from './PropertiesPanel'
import ShapeFactory from './primitives/ShapeFactory'

export default {
    name: 'WhiteBoard',
    // created: function() {
    //     axios.get('http://192.168.0.103:8080/springtest/primitives').then(function(response) {
    //     }.bind(this))
    //     .catch(e => {
    //         this.errors.push(e);
    //     })
    // },
    components: {
        TopPanel,
        PropertiesPanel
    },
    data() {
        return {
            selectedObj: {},
            color: '#59c7f9',
            suckerCanvas: null,
            suckerArea: [],
            isSucking: false,
            shapes: [],
            errors: [],
            showMenu: false,
            items: [
                { title: 'Start to Draw Line' },
                { title: 'End to Draw Line'}
            ],
            gridSize: 20,   
            stageSize: {
                width: 500,
                height: 500
            }
        }
    },
    mounted : function() {
        var gridLayer = new Konva.Layer();
        var padding = this.gridSize;
        console.log(this.stageSize.width, padding, this.stageSize.width / padding);
        for (var i = 0; i < this.stageSize.width / padding; i++) {
            gridLayer.add(new Konva.Line({
                points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, this.stageSize.height],
                stroke: '#ddd',
                strokeWidth: 2,
            }));
        }

        gridLayer.add(new Konva.Line({points: [0,0,10,10]}));
        for (var j = 0; j < this.stageSize.height / padding; j++) {
            gridLayer.add(new Konva.Line({
                points: [0, Math.round(j * padding), this.stageSize.width, Math.round(j * padding)],
                stroke: '#ddd',
                strokeWidth: 2,
            }));
        }
        this.$refs.stageEl.getNode().add(gridLayer)
        gridLayer.moveToBottom()
        gridLayer.draw()

    },
    methods: {
        customFunct(e, on) {
            on['click'](e.evt);
        },
        handleTransformEnd(e) {
            if(this.selectedObj) {
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
            return Math.round(x / this.gridSize) * this.gridSize
        },
        createComponent(e) {
            var factory = Vue.extend(ShapeFactory);
            var shape = new factory().createShape(e)
            this.shapes.push(shape)
            var kShape = Vue.component(shape.type);

            var anchor = new kShape({
                propsData: {
                    config: shape,
                    key: shape.id,
                }
            });
            this.$refs.layerEl.getNode().add(anchor.getNode())
            anchor.$parent = this.$refs.layerEl
            anchor.getNode().on('transformend', this.handleTransformEnd)
            anchor.getNode().on('dragend', (e) => {
                anchor.getNode().position({
                    x: this.getGridSize(anchor.getNode().x()),
                    y: this.getGridSize(anchor.getNode().y()),
                });
                this.$refs.stageEl.getNode().batchDraw();
            });
            
            anchor.$mount()            
            this.$refs.layerEl.getNode().draw()
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
            e.target.getParent().className === 'Transformer';
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

            const selectedNode = stage.findOne('.' + this.selectedObj.name);
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
}
</script>