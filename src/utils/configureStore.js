/**
 * Created by xiaojianli on 2017/1/13.
 */
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducres';
import {asyncMiddleware} from 'redux-amrc';

let createStoreWidthMiddleware;

if(process.env.NODE_ENV === 'production'){
    createStoreWidthMiddleware = compose(applyMiddleware(thunk,asyncMiddleware))(createStore);
}else{
    createStoreWidthMiddleware = compose(applyMiddleware(thunk,asyncMiddleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'?window.devToolsExtension():f => f)(createStore);
}

export default function configureStore(initialState) {
    const store = createStoreWidthMiddleware(rootReducer,initialState);
    if(module.hot){
        module.hot.accept('../reducers',()=>{
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer);
        })
    }
    return store;
}