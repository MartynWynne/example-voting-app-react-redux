import * as types from './actionTypes';

export function showPage() {
    return { type: types.SHOW_PAGE };
}

export function updateScores(json) {
    return { type: types.UPDATE_SCORES, json };
}