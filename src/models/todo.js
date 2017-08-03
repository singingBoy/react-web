module.exports = {

    namespace: 'todo',

    state: {
        value: 0,
        flag: true
    },

    reducers: {
        success(state, action) {
            console.log('success',action)
            return { ...state, ...action.payload };
        }
    },

};
