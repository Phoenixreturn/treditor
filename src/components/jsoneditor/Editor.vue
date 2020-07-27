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
        <tr class="hover:vue-ads-bg-blue-500" v-for="item in Object.keys(obj)" :key="item">
          <td>{{item}}</td>
          <td>{{obj[item]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Editor",
  props: {
    obj: {
      type: Object,
      default: function() {
        return { one: "first", two: { three: "third" } }
      }
    }
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