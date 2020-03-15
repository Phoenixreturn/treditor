<template>
    <div>
      <v-treeview :items="{}"></v-treeview>
       <JsonEditor
        :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
        }"
        :objData="{}" 
        v-model="selectedObject"
        @input="function() {}" >
    </JsonEditor>
    </div>
</template>

<script>
import Vue from 'vue'
import JsonEditor from './treeview'

export default {
    name: 'PropertiesPanel',
    data: function() {
        return {
            selectedObject: {}
        }
    },
    components: {
        JsonEditor
    }
}
</script>