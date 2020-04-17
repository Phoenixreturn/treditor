<template>
  <div class="properties-tree" height="100%">
    <JsonEditor
      :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
        }"
      :objData="selectedObject"
      v-model="selectedObject"
    ></JsonEditor>
    <vue-ads-table
      :columns="columns"
      :rows="rows"
      :filter="filterValue"
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
import JsonEditor from "../treeview"
import { VueAdsTable } from "vue-ads-table-tree"
Vue.use(JsonEditor)

export default {
  name: "PropertiesPanel",
  components: {
    VueAdsTable
  },
  props: {
    currentObject: {
      type: Object,
      default: function() {
        return {}
      }
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
          property: "shapeType",
          title: "#",
          direction: null,
          sortable: false
        },
        {
          property: "phoenix",
          title: "Shape ID",
          direction: null,
          filterable: true,
          collapseIcon: true
        }
      ],
      rows: [
        {
          shapeType: "Josephine",
          phoenix: "Astrid"
        },
        {
          shapeType: "Boudewijn",
          phoenix: "Van Brabandt"
        },
        {
          shapeType: "Albert II",
          phoenix: "Van Belgie",
          _children: [
            {
              shapeType: "Filip",
              phoenix: "Van Belgie",
              _children: [
                {
                  shapeType: "Elisabeth",
                  phoenix: "Van Brabant"
                },
                {
                  shapeType: "Gabriel",
                  phoenix: "Boudwijn"
                },
                {
                  shapeType: "Emmanuel",
                  phoenix: "Van Belgie"
                },
                {
                  shapeType: "Eleonore",
                  phoenix: "Boudwijn",
                  _hasChildren: true
                }
              ]
            },
            {
              shapeType: "Astrid",
              phoenix: "Van Belgie"
            },
            {
              shapeType: "Laurent",
              phoenix: "Van Belgie"
            }
          ]
        },
        {
          shapeType: "Alexander",
          phoenix: "Van Belgie"
        },
        {
          shapeType: "Marie-Christine",
          phoenix: "Leopoldine"
        },
        {
          shapeType: "Marie-Esmeralda",
          phoenix: "Leopoldine"
        }
      ]
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