import {createStore} from 'redux';

const reducer = (state,action)=>{
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
			...state,
			infoUsuarios:{id:'', rol:'' , nombre:''},
		}
	}
	return state;
};

export default createStore(reducer,{infoUsuarios:""});