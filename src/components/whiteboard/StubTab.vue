<template>
    <div style="height: 100%"> Stub Tab {{ content }}</div>
</template>

<script>
export default {
    name: 'PropertiesPanel',
    props: {
        content: {
            type: String,
            default: ''
        }
    }
}
</script>