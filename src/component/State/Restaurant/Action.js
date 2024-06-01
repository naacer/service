import axios from "axios";
import {
    CREATE_CATEGORY_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_EVENTS_FAILURE,
    CREATE_EVENTS_REQUEST,
    CREATE_EVENTS_SUCCESS,
    CREATE_RESTAURANTS_CATEGORY_REQUEST,
    CREATE_RESTAURANT_FAILURE,
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    DELETE_EVENTS_FAILURE,
    DELETE_EVENTS_REQUEST,
    DELETE_EVENTS_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_SUCCESS,
    GET_ALL_EVENTS_FAILURE,
    GET_ALL_EVENTS_REQUEST,
    GET_ALL_EVENTS_SUCCESS,
    GET_ALL_RESTAURANTS_FAILURE,
    GET_ALL_RESTAURANTS_REQUEST,
    GET_ALL_RESTAURANTS_SUCCESS,
    GET_RESTAURANTS_CATEGORY_FAILURE,
    GET_RESTAURANTS_CATEGORY_REQUEST,
    GET_RESTAURANTS_CATEGORY_SUCCESS,
    GET_RESTAURANTS_EVENTS_FAILURE,
    GET_RESTAURANTS_EVENTS_REQUEST,
    GET_RESTAURANTS_EVENTS_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE,
    GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURANT_BY_USER_ID_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST,
    GET_RESTAURANT_BY_USER_ID_SUCCESS,
    UPDATE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_REQUEST,
    UPDATE_RESTAURANT_SUCCESS
} from "./ActionType";
import { api } from "../../config/api";

// Helper function to handle common error structure
const handleError = (error) => {
    console.error("Error:", error);
    if (error.response) {
        // Server responded with a status other than 2xx
        return error.response.data.message || error.response.data.error;
    } else if (error.request) {
        // Request was made but no response was received
        return "Network error";
    } else {
        // Something happened in setting up the request
        return error.message;
    }
};

export const getAllRestaurantsAction = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
        try {
            const { data } = await api.get("/api/restaurants", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
            console.log("All restaurants:", data);
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: errorMessage });
        }
    };
};

export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
        try {
            const response = await api.get(`/api/restaurants/${reqData.restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: errorMessage });
        }
    };
};

export const getRestaurantByUserId = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/admin/restaurants/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Get restaurant by user ID:", data);
            dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: errorMessage });
        }
    };
};

export const createRestaurant = (reqData) => {
    console.log("Token:", reqData.token);
    return async (dispatch) => {
        dispatch({ type: CREATE_RESTAURANT_REQUEST });
        try {
            const { data } = await api.post(`/api/admin/restaurants`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            console.log("Created restaurant:", data);
            dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: errorMessage });
        }
    };
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_REQUEST });
        try {
            const res = await api.put(`/api/admin/restaurant/${restaurantId}`, restaurantData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Updated restaurant:", res.data);
            dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data });
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: errorMessage });
        }
    };
};

export const deleteRestaurant = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        try {
            const res = await api.delete(`/api/admin/restaurants/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Deleted restaurant:", res.data);
            dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: errorMessage });
        }
    };
};

export const updateRestauranStatus = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_REQUEST });
        try {
            const res = await api.put(`/api/admin/restaurants/${restaurantId}/status`, {}, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Updated restaurant status:", res.data);
            dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data });
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: errorMessage });
        }
    };
};

export const createEventAction = ({ data, jwt, restaurantId }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_EVENTS_REQUEST });
        try {
            const res = await api.post(`/api/admin/events/restaurant/${restaurantId}`, data, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Created event:", res.data);
            dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data });
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: CREATE_EVENTS_FAILURE, payload: errorMessage });
        }
    };
};

export const getAllEvents = ({ jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_EVENTS_REQUEST });
        try {
            const res = await api.get(`/api/events`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Got all events:", res.data);
            dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: errorMessage });
        }
    };
};

export const deleteEventAction = ({ eventId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_EVENTS_REQUEST });
        try {
            const res = await api.delete(`api/admin/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Deleted event:", res.data);
            dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: DELETE_EVENTS_FAILURE, payload: errorMessage });
        }
    };
};

export const getRestaurantsEvents = ({ jwt, restaurantId }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
        try {
            const res = await api.get(`/api/admin/events/restaurant/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Got restaurant events:", res.data);
            dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: errorMessage });
        }
    };
};

export const createCategoryAction = ({ reqData, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_CATEGORY_REQUEST });
        try {
            const res = await api.post(`/api/admin/category`, reqData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Created category:", res.data);
            dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: CREATE_CATEGORY_FAILURE, payload: errorMessage });
        }
    };
};

export const getRestaurantsCategory = ({ jwt, restaurantId }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
        try {
            const res = await api.get(`/api/category/restaurant/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Got restaurant categories:", res.data);
            dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });
        } catch (error) {
            const errorMessage = handleError(error);
            dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: errorMessage });
        }
    };
};
