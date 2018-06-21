import {createStore} from 'redux';

const reducer = (state,action)=>{
	if(action.type ==="LOG_IN"){
		return{
			...state,
			infoUsuarios: state.userName.concat(action.infoUsuario)
		}
	}
	else if(action.type==="lOG_OUT"){
		return{
			...state,
			infoUsuarios: "",
		}
	}
	return state;
};

export default createStore(reducer,{infoUsuarios:[]});