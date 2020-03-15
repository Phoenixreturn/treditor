<template>
        <v-circle :key="id" :config="item" @transformend="handleTransformEnd" @click="setTreeItem"/>
</template>

<script>
import Shape from './Shape'

export default {
    name: 'Circle',
    mixins: [Shape],
    data: function() {
        return {
            radius: 1,
            stroke: 2,
            strokeWidth: 3
        }
    }
}
</script>