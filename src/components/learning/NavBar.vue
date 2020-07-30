<template>
    <a v-bind:href="url">
        <slot> $$$$ {{ url }}</slot>
    </a>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        url: String,
    }
}
</script>