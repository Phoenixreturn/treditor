<template>
       <v-rect :key="id" :config="this.data" @transformend="handleTransformEnd" @click="setTreeItem"/>
</template>

<script>
import Shape from './Shape'

export default {
    name: 'Rectangle',
    mixins: [Shape],
}
</script>