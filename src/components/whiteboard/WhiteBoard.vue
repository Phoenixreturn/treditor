<template>
    <div className="whiteboard">
        <h1>Whiteboard</h1>
        <v-container>

            <v-row align="center" justify="center">
                <TopPanel @create='createComponent'></TopPanel>
            </v-row>

            <v-row>
                <v-col>
                     <v-stage ref="stageEl" :config="stageSize" @mouseDown="handleStageMouseDown" style="background: #dfffff">
                    <v-layer ref="layerEl">         
                        <v-transformer ref="transformer" />
                    </v-layer>
                </v-stage> 
                </v-col>

                <v-col>
                    <PropertiesPanel :currentObject='selectedObj' 
                                     :items='shapes'
                                     @update:selectedObject="updateSelectedObject"></PropertiesPanel>
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
    created: function() {
        axios.get('http://192.168.0.103:8080/springtest/primitives').then(function(response) {
        }.bind(this))
        .catch(e => {
            this.errors.push(e);
        })
    },
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
            stageSize: {
                width: 500,
                height: 500
            }
        }
    },
    methods: {
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
            this.$refs.layerEl.getNode().draw()
        },
        updateSelectedObject(obj) {
            console.log('dsvsdf')
            this.shapes[0].x = 150;
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
        }
    }
}
</script>