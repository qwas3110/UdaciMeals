import { combineReducers } from 'redux';
import {
    ADD_RECIPE,
    REMOVE_FROM_CALENDAR,
} from '../actions';


// 创建food reducer

function food(state = {}, action) {

    switch (action.type) {
        case ADD_RECIPE:
            const { recipe }  = action;

            return {
                // 无论当前状态是什么，我们都将它赋值给state
                ...state,
                [recipe.label]: recipe
            };
        default:
            return state
    }

}




const initialCalendarState = {
    sunday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    monday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    tuesday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    wednesday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    thursday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    friday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    saturday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
};



// [ ] （用于引用对象属性名称）

function calendar(state = initialCalendarState, action) {
    const { day, recipe, meal } = action;

    switch (action.type) {
        case ADD_RECIPE:
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [meal]: recipe.label,
                }
            };
        case REMOVE_FROM_CALENDAR:
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [meal]: null,
                }
            };
        default :
            return state;
    }
}

export default combineReducers({
    food,
    calendar,
});
