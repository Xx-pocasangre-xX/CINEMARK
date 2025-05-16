// Importo todo lo de la libreria de Express
import express from "express";
import clientesRoutes from "./src/routes/clientes.js";
import empleadosRoutes from "./src/routes/empleados.js";
import peliculasRoutes from "./src/routes/peliculas.js";
import registroEmpleadosRoutes from "./src/routes/registroEmpleados.js";
import cookieParser from "cookie-parser";
import loginRoute from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js";
import registroClientesRoutes from "./src/routes/registroClientes.js";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";

// Creo una constante que es igual a la libreria que importé
const app = express();
//s
//Que acepte datos en json
app.use(express.json());
// Para que postman guarde el token en una cookie
app.use(cookieParser());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/clientes", clientesRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/peliculas", peliculasRoutes);

app.use("/api/registroEmpleados", registroEmpleadosRoutes);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);

app.use("/api/registroClientes", registroClientesRoutes);

app.use("/api/RecoveryPassword", recoveryPasswordRoutes);


// Exporto la constante para poder usar express en otros archivos
export default app;
