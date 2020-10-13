<template>
  <div class="properties-tree" height="100%">
    <!-- <JsonEditor
      :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
        }"
      :objData="selectedObject"
      v-model="selectedObject"
    ></JsonEditor> -->
    <MyEditor v-if="selectedObject != null" :obj="selectedObject"></MyEditor>
    <vue-ads-table
      :columns="columns"
      :rows="items"
      :page="page"
      selectable
      @filter-change="filterChanged"
      @page-change="pageChanged"
      @selection-change="changedSelection"
    >
   <template slot="shapeType" slot-scope="props">
         <v-icon>$vuetify.icons.label</v-icon>
            </template>
    </vue-ads-table>
  </div>
</template>

<script>
import Vue from "vue"
// import JsonEditor from "../treeview"
import MyEditor from "../jsoneditor/Editor.vue"
import { VueAdsTable } from "vue-ads-table-tree"
// Vue.use(MyEditor)

export default {
  name: "PropertiesPanel",
  components: {
    VueAdsTable,
    MyEditor
  },
  props: {
    currentObject: {
      type: Object,
      default: null,
    },
    items: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data: function() {
    return {
      page: 0,
      filter: "",
      columns: [
        {
          property: "id",
          title: "#",
          direction: null,
          sortable: false
        },
        {
          property: "type",
          title: "Shape ID",
          direction: null,
          filterable: true,
          collapseIcon: true
        }
      ],
    }
  },

  methods: {
    filterChanged(filter) {
      this.filter = filter
    },

    pageChanged(page) {
      this.page = page
    },
    changedSelection(selectedItems) {
      console.log('################# ')
    }
  },
  computed: {
    selectedObject: {
      get: function() {
        return this.currentObject
      },
      set: function(currentObject) {
        if (this.currentObject.id === currentObject.id) {
          for (var propertyName in currentObject) {
            if (this.currentObject[propertyName] !== currentObject[propertyName]) {
              this.currentObject[propertyName] = currentObject[propertyName]
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.properties-tree {
  border: 1px solid black; /* Параметры границы */
  padding: 2px; /* Поля вокруг текста */
}
</style>