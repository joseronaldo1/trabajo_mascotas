import express from "express";
import bodyParser from 'body-parser';
import rutaUsuario from "./src/routes/usuario.routes.js"; // Asegúrate de que esta sea la ubicación correcta de tu enrutador
import validacionLogin from "./src/routes/autenticacion.routes.js";
import Pets from "./src/routes/Pets.routes.js";
import categories from "./src/routes/categories.routes.js";
import razas from "./src/routes/Raze.routes.js";
import generos from "./src/routes/genders.routes.js";
import cors from 'cors';

const app = express();
const port = 3500;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:5173' // Agrega el origen de tu cliente aquí
  }));
  app.set('view engine', 'ejs');
  app.set('views', './views');
  
  app.get('/documents', (req, res) => {
      res.render('document.ejs');
  });

app.use(rutaUsuario);
app.use(validacionLogin)
app.use(Pets)
app.use(categories)
app.use(generos)
app.use(razas)
app.use('/img', express.static('img/'));

app.listen(port, () => console.log(`Server running on port ${port}`));
