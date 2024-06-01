import { LOGOUT } from "../Authentification/ActionType";
import * as actionTypes from "./ActionType";

const initialState = {
    restaurants: [],
    usersRestaurant: null,
    restaurant: null,
    loading: false,
    error: null,
    events: JSON.parse(localStorage.getItem('events')) || [], // Initialize with data from localStorage
    restaurantsEvents: JSON.parse(localStorage.getItem('restaurantsEvents')) || [], // Initialize with data from localStorage
    categories: [],
};

const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_CATEGORY_REQUEST:
        case actionTypes.GET_ALL_RESTAURANTS_REQUEST:
        case actionTypes.DELETE_RESTAURANT_REQUEST:
        case actionTypes.GET_RESTAURANTS_CATEGORY_REQUEST:
        case actionTypes.UPDATE_RESTAURANT_REQUEST:
        case actionTypes.CREATE_RESTAURANT_REQUEST:
        case actionTypes.GET_RESTAURANT_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                usersRestaurant: action.payload,
            };
        case actionTypes.GET_ALL_RESTAURANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurants: action.payload,
                events: action.payload
            };
        case actionTypes.GET_RESTAURANT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurant: action.payload,
            };
        case actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                usersRestaurant: action.payload,
            };
        case actionTypes.DELETE_RESTAURANT_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                restaurants: state.restaurants.filter(
                    (item) => item.id !== action.payload
                ),
                usersRestaurant: state.usersRestaurant.filter(
                    (item) => item.id !== action.payload
                ),
            };
        case actionTypes.CREATE_EVENTS_SUCCESS:
            const updatedEvents = [...state.events, action.payload];
            const updatedRestaurantsEvents = [...state.restaurantsEvents, action.payload];
            localStorage.setItem('events', JSON.stringify(updatedEvents));
            localStorage.setItem('restaurantsEvents', JSON.stringify(updatedRestaurantsEvents));
            return {
                ...state,
                loading: false,
                events: updatedEvents,
                restaurantsEvents: updatedRestaurantsEvents,
            };
        case actionTypes.GET_ALL_EVENTS_SUCCESS:
            localStorage.setItem('restaurantsEvents', JSON.stringify(action.payload));
            return {
                ...state,
                loading: false,
                restaurantsEvents: action.payload,
            };
        case actionTypes.GET_RESTAURANTS_EVENTS_SUCCESS:
            localStorage.setItem('restaurantsEvents', JSON.stringify(action.payload));
            return {
                ...state,
                loading: false,
                restaurantsEvents: action.payload,
            };
        case actionTypes.DELETE_EVENTS_SUCCESS:
            const filteredEvents = state.restaurantsEvents.filter(
                (item) => item.id !== action.payload
            );
            localStorage.setItem('restaurantsEvents', JSON.stringify(filteredEvents));
            return {
                ...state,
                loading: false,
                events: filteredEvents,
            };
        case actionTypes.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
            };
        case actionTypes.GET_RESTAURANTS_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };
        case actionTypes.CREATE_RESTAURANT_FAILURE:
        case actionTypes.GET_ALL_RESTAURANTS_FAILURE:
        case actionTypes.DELETE_RESTAURANT_FAILURE:
        case actionTypes.UPDATE_RESTAURANT_FAILURE:
        case actionTypes.GET_RESTAURANT_BY_ID_FAILURE:
        case actionTypes.CREATE_EVENTS_FAILURE:
        case actionTypes.CREATE_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOGOUT:
            localStorage.removeItem("jwt");
            localStorage.removeItem("events");
            localStorage.removeItem("restaurantsEvents");
            return {
                ...state,
                restaurants: [],
                restaurant: null
            }
        default:
            return state;
    }
};

export default restaurantReducer;
