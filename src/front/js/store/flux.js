const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
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

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
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
          const resp = await fetch(
            "https://3001-jengm-sistemadeautenti-05qbzxxbgzn.ws-us71.gitpod.io/api/token",
            results
          );
          if (resp !== 200) {
            alert("Hay un error en el fetch");
            return false;
          }
          const data = await resp.json();
          console.log("Result from the backend", data);
          sessionStorage.setItem("token", data.access_token);
        } catch (error) {
          console.error("Error al cargar", error);
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
