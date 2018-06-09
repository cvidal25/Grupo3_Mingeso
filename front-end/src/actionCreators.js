
const salirCuenta = (infoUsuario) => {
	return{
        type:"LOG-OUT",
        infoUsuario: infoUsuario,
    };
};

export default {salirCuenta};