import express from 'express'
import cors from 'cors'
import { router } from '../routes/user.js';

export default class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath = '/api/usuarios'; 

    //middlewares
    this.middlewares();

    this.routes();

  }

  routes() {
    //middleware condicional
    this.app.use(this.usuariosPath, router);

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  middlewares() {

    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static('public'));
    
  }

}
