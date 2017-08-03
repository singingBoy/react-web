module.exports = {

    namespace: 'todo1',

    state: {
        text: 'todo1'
    },

    reducers: {
        fail(state, action) {
            return { ...state, ...action.payload };
        }
    },

};
