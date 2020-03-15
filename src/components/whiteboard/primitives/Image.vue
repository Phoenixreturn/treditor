<template>
    <v-image :key="item.id" :config="item" @transformend="handleTransformEnd"/>
</template>

<script>
export default {
    name: 'Image',
}
</script>