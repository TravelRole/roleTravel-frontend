const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/:userid",
    createProxyMiddleware({
      target: "https://dapi.kakao.com/",
      changeOrigin: true,
    })
  );
};
