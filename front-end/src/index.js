import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import store from './store';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import { loadState, saveState } from './LocalStorage';

 
const persistedState = loadState();
export const store = createStore(
	persistedState, 
	reducer,
	{infoUsuarios:""}
);

 store.subscribe(()=>{
	saveState({
		login: store.getState().login
	});
});


export const reducer = (state,action)=>{
	if(action.type ==="LOG_IN"){
			console.log("bbbbbbbbbbbbbbb");
		return{
			...state,
			infoUsuarios:action.infoUsuario,
		}
			
	}
	else if(action.type==="lOG_OUT"){
		console.log("lalalalalalalalalal");
		return{
			
			infoUsuario:{"userID":'',"userName":'',"userType":'',"userMail":'',"userCareer":'',"userCoordination":''},

		}
	}
	return state;
};

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,

	document.getElementById('root'));
registerServiceWorker();
