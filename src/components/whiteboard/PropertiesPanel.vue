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
          <i class="fa fa-pencil" title="Edit"></i>
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
      <template slot="firstName" slot-scope="props">
         <v-icon>$vuetify.icons.line</v-icon>
        <a
          :href="`https://www.google.com/search?q=${props.row.firstName}+${props.row.lastName}`"
          target="_blank"
        > {{ props.row.firstName }}</a>
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
          property: "firstName",
          title: "First Name",
          direction: null,
          filterable: true
        },
        {
          property: "lastName",
          title: "Last Name",
          direction: null,
          filterable: true,
          collapseIcon: true
        }
      ],
      rows: [
        {
          firstName: "Josephine",
          lastName: "Astrid"
        },
        {
          firstName: "Boudewijn",
          lastName: "Van Brabandt"
        },
        {
          firstName: "Albert II",
          lastName: "Van Belgie",
          _children: [
            {
              firstName: "Filip",
              lastName: "Van Belgie",
              _children: [
                {
                  firstName: "Elisabeth",
                  lastName: "Van Brabant"
                },
                {
                  firstName: "Gabriel",
                  lastName: "Boudwijn"
                },
                {
                  firstName: "Emmanuel",
                  lastName: "Van Belgie"
                },
                {
                  firstName: "Eleonore",
                  lastName: "Boudwijn",
                  _hasChildren: true
                }
              ]
            },
            {
              firstName: "Astrid",
              lastName: "Van Belgie"
            },
            {
              firstName: "Laurent",
              lastName: "Van Belgie"
            }
          ]
        },
        {
          firstName: "Alexander",
          lastName: "Van Belgie"
        },
        {
          firstName: "Marie-Christine",
          lastName: "Leopoldine"
        },
        {
          firstName: "Marie-Esmeralda",
          lastName: "Leopoldine"
        },
        {
          firstName: "Alexander",
          lastName: "Van Belgie"
        },
        {
          firstName: "Marie-Christine",
          lastName: "Leopoldine"
        },
        {
          firstName: "Marie-Esmeralda",
          lastName: "Leopoldine"
        },
        {
          firstName: "Alexander",
          lastName: "Van Belgie"
        },
        {
          firstName: "Marie-Christine",
          lastName: "Leopoldine"
        },
        {
          firstName: "Marie-Esmeralda",
          lastName: "Leopoldine"
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
  border: 4px double black; /* Параметры границы */
  padding: 10px; /* Поля вокруг текста */
}
</style>