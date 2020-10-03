<template>
  <div>
    <table>
      <thead>
        <tr class="hover:vue-ads-bg-blue-500">
          <th>
            <i class="fa fa-camera-retro"></i>Key
          </th>
          <th>
            <i class="fa fa-check-square"></i>Value
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:vue-ads-bg-blue-500" v-for="entry in flattenedValues.entries()" :key="entry[0]">
          <td>{{entry[0]}}</td>
          <td><CellView :val=entry[1]></CellView></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CellView from './CellView.vue'
import flatten from './flatten.js'

export default {
  name: "Editor",
  components: {
    CellView
  },
  mixins: [
    flatten
  ],
  props: {
    obj: {
      type: Object,
      default: function () {
        return { one: "first", two: { three: "Something new in these day", expanded: true }, test: { yy: 'ttt', xx: "robert"}, fourc: true, svsf: 454 }
      },
    },
  },
   created: function () {   
    console.log('Created MyEditor.')
  }
}
</script>

<style scoped>
table {
  width: 100%; /* Ширина таблицы */
  border: 4px black; /* Рамка вокруг таблицы */
  border-collapse: collapse; /* Отображать только одинарные линии */
}
th {
  text-align: left; /* Выравнивание по левому краю */
  background: #ccc; /* Цвет фона ячеек */
  padding: 5px; /* Поля вокруг содержимого ячеек */
  border: 1px solid black; /* Граница вокруг ячеек */
}
td {
  padding: 5px; /* Поля вокруг содержимого ячеек */
  border: 1px solid black; /* Граница вокруг ячеек */
}
</style>