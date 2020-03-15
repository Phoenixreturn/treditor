<template>
    <div class="properties-tree">    
       <JsonEditor
        :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
        }"
        :objData="selectedObject" 
        v-model="selectedObject">
    </JsonEditor>
    <v-treeview :items="items"></v-treeview>
    </div>
</template>

<script>
import Vue from 'vue'
import JsonEditor from '../treeview'
Vue.use(JsonEditor)

export default {
    name: 'PropertiesPanel',
    props: {
        currentObject: {
            type: Object,
            default: function () {
                return { }
            }
        },
        items: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    computed: {
        selectedObject: {
            get: function(){
                return this.currentObject;
            },
            set: function(currentObject){
                console.log('sert va;ue')
                this.$emit('update:selectedObject', currentObject)
            }   
        },
    }
}
</script>

<style scoped>
.properties-tree {
    border: 4px double black; /* Параметры границы */
    padding: 10px; /* Поля вокруг текста */
}
</style>