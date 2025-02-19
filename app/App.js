import { AuthController } from './controllers/AuthController.js';
import { CarsController } from './controllers/CarsController.js';
import { HouseController } from './controllers/HouseController.js';
import { JobsController } from './controllers/JobsController.js';
import { router } from './router-config.js';
const USE_ROUTER = false

class App {

  AuthController = new AuthController()
  HouseController = new HouseController()
  CarsController = new CarsController()
  JobsController= new JobsController()

  constructor() {
    if (USE_ROUTER) {
      this.router = router
      this.router.init(this)
    }
  }
}


const app = new App()
// @ts-ignore
window.app = app
