---
title: CORS in many diffrent programming language
date: 23-3-2022
tags:
    - golang
    - nodejs
    - deno
    - cors
    - rosetta
---

Yes, another rosetta but for cors. Pardon me if some example goes unexpected.
Please open [issue](https://github.com/falentio/kepin-turu/issues/new) or create [pull request](https://github.com/falentio/kepin-turu/compare) if some example is wrong.

# Nodejs

## express

This example also work with polka, and any express-like lib.

```js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
```

## koa

```js
const Koa = require("koa");
const cors = require("@koa/cors");
const app = new Koa();
app.use(cors());
```

## fastify

```js
const fastify = require("fastify")();
fastify.register(require("fastify-cors"), { origin: true });
```

## restify

```js
const restify = require("restify");
const server = restify.createServer();
server.use(restify.CORS());
```

# Deno

## oak

```ts
import { Application } from "https://deno.land/x/oak@v10.4.0/mod.ts";
const app = new Application();
app.use((ctx, next) => {
	ctx.response.headers.set("access-control-allow-origin", "*");
	return next();
});
```

# Golang

## chi

```go
package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func main() {
	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"*"},
	}))
	http.ListenAndServe(":8080", r)
}
```

## std/http

```go
package main

import (
	"net/http"

	"github.com/rs/cors"
)

func main() {
	mux := http.NewServerMux()
	http.ListenAndServe(":8080", cors.Default().Handler(mux))
}
```

## fiber

```go
package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
}
```

## gin

```go
package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func main() {
	r := gin.Default()
	r.Use(cors.Default())
}
```
