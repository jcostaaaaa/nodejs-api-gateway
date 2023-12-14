const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const routes = [
  {
    context: "/user",
    target: "http://localhost:9998",
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/user": "/user" },
  },
  {
    context: "/pharm",
    target: "http://localhost:9099",
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/pharm": "/pharm" },
  },
  {
    context: "/products",
    target: "http://localhost:9000",
    pathRewrite: { "^/products": "/products" }, 
  },
  {
    context: "/orders",
    target: "http://localhost:9996",
    pathRewrite: { "^/orders": "/orders" }, 
  },
];

routes.forEach((route) => {
  app.use(
    route.context,
    createProxyMiddleware({
      target: route.target,
      pathRewrite: route.pathRewrite,
      changeOrigin: true,
      secure: false,
    })
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`O servidor de gateway está na porta ${PORT}`);
});
