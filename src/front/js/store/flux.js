const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      //Getting the token from the session store
      setTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        if(token && token != "" && token != undefined) setStore({ token: token })
      },

      login: async (email, password) => {
        /*  Metodo para enviar el email y password ingresados por el usuario */
        const results = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        /* Trae la informacion del backend por medio del fetch */
        try {
          const resp = await fetch("https://3001-jengm-sistemadeautenti-05qbzxxbgzn.ws-us71.gitpod.io/api/token", results)
          if (resp.status !== 200) {
            alert("Error al cargar");
            return false;
          }

          const data = await resp.json();
          console.log("Result from the backend", data);
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;

        } catch (error) {
          console.error("Error al cargar", error);
        }
      },

      logout: () => {
        const token = sessionStorage.removeItem("token");
        setStore({ token: null })
      },

      getMessage: async () => {
        const store = getStore();
        const result = {
          headers: {
            "Authorization" : "Bearer " + store.token
          }
        }
        try {
          // fetching data from the backend
          const resp = await fetch("https://3001-jengm-sistemadeautenti-05qbzxxbgzn.ws-us71.gitpod.io/api/hello", result);
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },


      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
