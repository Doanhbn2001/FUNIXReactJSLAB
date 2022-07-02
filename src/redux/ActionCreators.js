import * as ActionType from "./ActionType";
import { DISHES } from "../shared/dish";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionType.ADD_COMMENT,
  payload: {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  },
});

export const fetchDishes = () => (ditspatch) => {
  ditspatch(dishesLoading(true));

  return fetch(baseUrl + "dishes")
    .then((response) => response.json())
    .then((dishes) => ditspatch(addDishes(dishes)));
};

export const dishesLoading = () => ({
  type: ActionType.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: ActionType.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionType.ADD_DISHES,
  payload: dishes,
});

//
export const fetchComments = () => (ditspatch) => {
  return fetch(baseUrl + "comments")
    .then((response) => response.json())
    .then((comments) => ditspatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
  type: ActionType.COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments) => ({
  type: ActionType.ADD_COMMENTS,
  payload: comments,
});

//
export const fetchPromos = () => (ditspatch) => {
  ditspatch(promosLoading(true));

  return fetch(baseUrl + "promotions")
    .then((response) => response.json())
    .then((promos) => ditspatch(addPromos(promos)));
};

export const promosLoading = () => ({
  type: ActionType.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: ActionType.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionType.ADD_PROMOS,
  payload: promos,
});
