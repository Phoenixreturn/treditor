<template>
    <div>
         <v-btn-toggle
            mandatory
          >
            <v-btn @click="onClick('rectangle')">
              <v-icon>mdi-format-align-left</v-icon>
            </v-btn>
            <v-btn @click="onClick('circle')">
              <v-icon>mdi-format-align-center</v-icon>
            </v-btn>
            <v-btn @click="onClick('textLabel')">
              <v-icon>mdi-format-align-right</v-icon>
            </v-btn>
            <v-btn @click="onClick('polyLine')">
              <v-icon>mdi-format-align-justify</v-icon>
            </v-btn>
            <v-btn @click="onClick('path')">
              <v-icon>mdi-format-align-justify</v-icon>
            </v-btn>
          </v-btn-toggle>
    </div>
</template>

<script>

export default {
    name: 'TopPanel',
    methods: {
        onClick(e) {
            this.$emit('create', e)
        }
    }
}
</script>