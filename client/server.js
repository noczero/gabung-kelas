const express = require("express");
const next = require("next");
const {createProxyMiddleware} = require("http-proxy-middleware");

const envar = {
    serverURL: process.env.BASE_SERVER_URL || 'http://server-api-ems:8080',
    nodeENV: process.env.NODE_ENV || 'development',
    apiPrefix: process.env.BASE_API_URL_PREFIX || '/api',
}

const dev = envar.nodeENV !== "production"; // true or false
const app = next({dev});
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();
        // apply proxy in dev mode
        if (dev) {
            server.use(
                envar.apiPrefix,
                createProxyMiddleware({
                    target: envar.serverURL,
                    changeOrigin: true,
                })
            );
        }

        server.all("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log(`> Proxying API on ${envar.serverURL} to ${envar.clientURL}`);
        });
    })
    .catch((err) => {
        console.log("Error", err);
    });
