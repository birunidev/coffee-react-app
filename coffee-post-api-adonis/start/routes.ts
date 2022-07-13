/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/dashboard", async ({ auth, response }) => {
  const userPayloadFromJwt = auth.use("jwt").payload!;
  response.json({
    userPayloadFromJwt,
  });
}).middleware("jwtAuth");

Route.group(() => {
  Route.post("/login", "AuthController.login");
  Route.post("/register", "AuthController.register");
  Route.post("/logout", "AuthController.logout");
  Route.post("/refresh", "AuthController.refresh");
}).prefix("/auth");

Route.resource("users", "UsersController");
Route.resource("products", "ProductsController");
Route.resource("categories", "CategoriesController");
Route.resource("media", "MediaController");
Route.get("/media/download/:filename", "MediaController.download");

Route.resource("transactions", "TransactionsController");
