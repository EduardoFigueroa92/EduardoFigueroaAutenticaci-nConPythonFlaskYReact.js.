const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			datos : [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error);
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			},
			registro : async({email, password}) => {
				try {
					const response = await fetch('http://127.0.0.1:3001/api/users', {
					method: 'POST',
					headers:  { 
						'Content-Type': 'application/json',
						'accept': 'application/json' 
					},
					body : JSON.stringify({'email' : email, 'password' : password})
				});
							if (!response.ok) {
								console.error('Error al enviar datos');
								throw new Error('Error al enviar datos');
							}
							
							const data = await response.json();
							console.log('Datos guardados correctamente:', data);
							setStore({ datos: data.result });
						} catch (error) {
							console.error('Error:', error);
						}
					},

					login: async ({ email, password }) => {
						try {
							const response = await fetch('http://127.0.0.1:3001/api/login', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
									'accept': 'application/json'
								},
								body: JSON.stringify({ 'email': email, 'password': password })
							});
		
							if (!response.ok) {
								console.error('Error al enviar datos');
								throw new Error('Error al enviar datos');
							}
		
							const data = await response.json();
							console.log('Datos guardados correctamente:', data);
							localStorage.setItem("jwt-token", data.token);
							console.log(localStorage.getItem("jwt-token"));

                    return true;  
                } catch (error) {
                    console.error('Error:', error);
                    return false;  
                }
            },

            getToken: () => {
                const token = localStorage.getItem('jwt-token');
                return !!token;
            },

            logout: () => {
                localStorage.clear();
            }
        }
    };
};

export default getState;


						
