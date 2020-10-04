import types from './operation.types.js'
import primitives from '../components/whiteboard/primitives/primitive.type'

const eventContext = {
    namespaced: true,
    state: {
        type: types.INIT,
        primitive: primitives.CIRCLE,
        startPoint: {},
        createdPrimitve: null
    }
}

export default eventContext;