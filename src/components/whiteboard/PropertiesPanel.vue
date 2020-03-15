<template>
    <div class="properties-tree">    
       <JsonEditor
        :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
        }"
        :objData="currentObject" 
        v-model="currentObject"
        @input="function() {}" >
    </JsonEditor>
    <v-treeview :items="items"></v-treeview>
    </div>
</template>

<script>
import Vue from 'vue'
import JsonEditor from '../treeview/JsonEditor'

export default {
    name: 'PropertiesPanel',
    props: {
        currentObject: {
            type: Object,
            default: function () {
                return { message: 'hello' }
            }
        },
        items: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    components: {
        JsonEditor
    }
}
</script>

<style scoped>
.properties-tree {
    border: 4px double black; /* Параметры границы */
    padding: 10px; /* Поля вокруг текста */
}
</style>