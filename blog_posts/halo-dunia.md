---
tags:
    - golang
    - nodejs
    - deno
    - halo dunia
---

contoh contoh http server yang memiliki response "`halo dunia`"

# Deno

simpel halo dunia deno

```ts
import { serve } from "https://deno.land/std@0.129.0/http/server.ts";
import type { ConnInfo } from "https://deno.land/std@0.129.0/http/server.ts";

const handler = (_req: Request, _conn: ConnInfo) => {
	return new Response("halo dunia");
};

serve(handler, { port: 8080 });
```

# Node

simpel halo dunia node

```js
const http = require("http");

const handler = (_req, res) => {
	res.end("halo dunia");
};

http.createServer(handler).listen(8080);
```

# Go

simpel halo dunia go

```go
package main

import (
	"fmt"
	"net/http"
)

type handler struct{}

func (handler) ServeHTTP(w http.ResponseWriter, _ *http.Request) {
	fmt.Fprint(w, "halo dunia")
}

func main() {
	http.ListenAndServe(":8080", handler{})
}
```
