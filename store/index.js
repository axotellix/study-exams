
// [ STATE ]
export const state = () => {
    ads: []
};

// [ MUTATIONS ]
export const mutations = {

    //@ do > smth
    save( state, payload ) {
        state.ads = payload
    }
    
}