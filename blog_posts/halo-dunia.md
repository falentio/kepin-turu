---
tags:
    - golang
    - nodejs
    - deno
    - halo dunia
---

Lorem ipsum dolore fugiat ad qui sint reprehenderit consequat. magna anim velit anim officia duis deserunt minim laborum deserunt dolor mollit ut velit aute quis do ullamco.

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

Nisi dolor duis velit pariatur magna id aute qui mollit pariatur excepteur anim velit cillum sunt incididunt sint ex occaecat cupidatat occaecat nulla commodo commodo nulla reprehenderit elit nulla non reprehenderit officia ad.
