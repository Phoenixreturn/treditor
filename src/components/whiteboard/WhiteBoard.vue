<template>
    <div className="whiteboard">
        <h1>Whiteboard</h1>
        <v-container>

            <v-row align="center" justify="center">
                <TopPanel @create='createComponent'></TopPanel>
            </v-row>

            <v-row>
                <v-stage ref="stageEl" :config="stageSize" @mouseDown="handleStageMouseDown" style="background: #dfffff">
                    <v-layer ref="layerEl">         
                        <v-transformer ref="transformer" />
                    </v-layer>
                </v-stage>    
            </v-row>

        </v-container>     
    </div>
</template>

<script>
import Vue from 'vue'
import Konva from 'konva'
import axios from 'axios'
import TopPanel from './TopPanel'
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
        TopPanel
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
            console.log('triggered')
            var ComponentClass = Vue.extend(ShapeFactory)
            var rectangle = new ComponentClass().createRectangle()
            rectangle.$mount()
            this.$refs.layerEl.$el.appendChild(rectangle.$el)
        },
        setTreeItem(e) {
             // clicked on stage - clear selection
            if (e.target === e.target.getStage()) {
                this.selectedObj = {}
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
                this.selectedObj = rect;
            } else {
                const circ = this.circles.find(r => r.name === name);
                if (circ) {
                   this.selectedObj = circ;
                }            
            }
        },
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
        }
    }
}
</script>