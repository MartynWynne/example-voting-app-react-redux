import * as types from './actionTypes';

function showPage(state){
    document.body.style.opacity = 1;
    return state;
}

function updateScores(json) {
    const data = JSON.parse(json);

    return {
        aPercent: Math.round(data.a / (data.a + data.b) * 100),
        bPercent: Math.round(data.b / (data.a + data.b) * 100),
        total: data.a + data.b
    };
}

export default function reducer(state = [], action){
    switch (action.type) {
        case types.SHOW_PAGE:
            return showPage(state);
        case types.UPDATE_SCORES:
            return updateScores(action.json);
        default:
            return state;
    }
}