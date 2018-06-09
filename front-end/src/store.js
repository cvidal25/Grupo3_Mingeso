import {createStore} from 'redux';

const reducer = (state,action)=>{
	if(action.type ==="LOG_IN"){
		return{
			...state,
			infoUsuarios:action.infoUsuario,
		}
	}
	else if(action.type==="lOG_OUT"){
		return{
			...state,
			infoUsuarios: "",
		}
	console.log("bbbbbbbbbbbbbbb")
	console.log(this.state.infoUsuarios)
	console.log("bbbbbbbbbbbbbbb")
	}
	return state;
};

export default createStore(reducer,{infoUsuarios:""});