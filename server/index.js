const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/api/users", async (req, res, next) => {
    try {
      const response = await fetchUsers()
      res.send(response)
    } catch (error) {
      next(error)
    }
  });
  
  app.get("/api/products", async (req, res, next) => {
    try {
      const response = await fetchProducts();
      res.send(response)
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/api/users/:id/favorites", async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await fetchFavorites(id);
      res.send(response)
    } catch (error) {
      next(error);
    }
  });
  
  app.post("/api/users/:id/favorites", async (req, res, next) => {
    try {
      const { id } = req.params
      const { product_id } = req.body
      const response = await createFavorite(id, product_id);
      res.status(201).send(response)
    } catch (error) {
      next(error);
    }
  });
  
  app.delete("/api/users/:userId/favorites/:id", async (req, res, next) => {
    try {
      const { userId, id } = req.params
      const response = await destroyFavorite(id, userId);
      res.sendStatus(204)
    } catch (error) {
      next(error);
    }
  });
  
  
  /// initial
  
  
  const init = async () => {
    await client.connect()
    console.log("database connected & seeded")
    await createTables()
    console.log("tables created")
    await Promise.all([createUser("Locologan206", "666"), createUser("josh199", "345"), createUser("luxie55", "550")])
    const users = await fetchUsers()
    await Promise.all([createProduct("controller"), createProduct("keybaord"), createProduct("mousepad")])
    const products = await fetchProducts()
    await Promise.all([createFavorite(users[0].id, products[0].id), createFavorite(users[0].id, products[1].id), createFavorite(users[2].id, products[2].id)])
  
    app.listen(port, () => {
      console.log(`Listening on PORT ${PORT}`);
    })
  };
  
  init();