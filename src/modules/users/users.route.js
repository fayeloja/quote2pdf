// POST /auth/register

Router.post("/register", controller.register);

// POST /auth/login

Router.post("/login", controller.login);

// GET /auth/verify

Router.get("/verify", controller.verify);
