import * as ActionType from "./ActionType";
import { DISHES } from "../shared/dish";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (comment) => ({
  type: ActionType.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (ditspatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };
  newComment.date = new Date().toISOString();
  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
    .then(
      (reponse) => {
        if (reponse.ok) {
          return reponse;
        } else {
          var error = new Error(
            "Error " + reponse.status + ": " + reponse.statusText
          );
          error.reponse = reponse;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((reponse) => reponse.json())
    .then((reponse) => ditspatch(addComment(reponse)))
    .catch((error) => {
      console.log("Post comment ", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};

export const fetchDishes = () => (ditspatch) => {
  ditspatch(dishesLoading(true));

  return fetch(baseUrl + "dishes")
    .then(
      (reponse) => {
        if (reponse.ok) {
          return reponse;
        } else {
          var error = new Error(
            "Error " + reponse.status + ": " + reponse.statusText
          );
          error.reponse = reponse;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((dishes) => ditspatch(addDishes(dishes)))
    .catch((error) => {
      ditspatch(dishesFailed(error.message));
    });
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
    .then(
      (reponse) => {
        if (reponse.ok) {
          return reponse;
        } else {
          var error = new Error(
            "Error " + reponse.status + ": " + reponse.statusText
          );
          error.reponse = reponse;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((comments) => ditspatch(addComments(comments)))
    .catch((error) => {
      ditspatch(commentsFailed(error.message));
    });
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
    .then(
      (reponse) => {
        if (reponse.ok) {
          return reponse;
        } else {
          var error = new Error(
            "Error " + reponse.status + ": " + reponse.statusText
          );
          error.reponse = reponse;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => ditspatch(addPromos(promos)))
    .catch((error) => ditspatch(promosFailed(error.message)));
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
