<template>
    <div>
        <b-button-group>
            <b-button variant="secondary" @click="onClick('rectangle')">
                Rectangle
            </b-button>
            <b-button variant="secondary" @click="onClick('circle')">
                Circle
            </b-button>
            <b-button variant="secondary" @click="onClick('textLabel')">
                Label
            </b-button> 
            <b-button variant="secondary" @click="onClick('polyLine')">
                PolyLine
            </b-button>
        </b-button-group>
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