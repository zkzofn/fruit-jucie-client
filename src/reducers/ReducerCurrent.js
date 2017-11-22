import { POST_LOGIN, GET_VALIDATE } from '../actions/RequestManager';

const INITIAL_STATE = { user: null, status: null, msg: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_LOGIN:
      if (action.payload.data.status === 200)
        return { ...state, user: action.payload.data.user, status: action.payload.data.status };
      else if (action.payload.data.status === 404)
        return { ...state, status: action.payload.data.status, msg: action.payload.data.msg };
      else
        return {...state};

    case GET_VALIDATE:
      if (action.payload.data.result)
        return { ...state };
      else
        return { ...state, user: null };
  }
  return state;
}


// import { GET_VALIDATE } from '../actions/RequestManager';
//
// const INITIAL_STATE = { isLogin: null };
//
// export default function (state = INITIAL_STATE, action) {
//   switch (action.type) {
//     case GET_VALIDATE:
//       return { ...state, isLogin: action.payload.data.result };
//   }
//   return state;
// }