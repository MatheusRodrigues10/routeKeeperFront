let navigator;

//cria o navegador
export const setNavigator = (nav) => {
    navigator = nav;
};

//navigate é usado com paramêtro do nome da rota(tela) e paramêtros.
export const navigate = (routeName, params) => {
    navigator.navigate(routeName, params);
};