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
		sessionStorage.clear();
		return{
			infoUsuario:{"userID":'',"userName":'',"userType":'',"userMail":'',"userCareer":'',"userCoordination":''},
		}
	}
	return state;
};
export default createStore(reducer,{infoUsuarios:""});