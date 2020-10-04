import types from './operation.types.js'
import primitives from '../components/whiteboard/primitives/primitive.type'

const eventContext = {
    namespaced: true,
    state: {
        type: types.INIT,
        primitive: primitives.CIRCLE
    }
}

export default eventContext;