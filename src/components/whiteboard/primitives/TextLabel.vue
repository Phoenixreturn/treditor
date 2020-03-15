<template>
     <v-text :key="id" :config="data" @transformend="handleTransformEnd" @click="setTreeItem"/>
</template>

<script>

import Shape from './Shape'

export default {
    name: 'Label',
    mixins: [Shape],
    data: function() {
       return {
            text: 'placeholder',
            fontSize: 20
        }
    }
}
</script>