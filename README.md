#Simple static Node.JS server with no dependencies.

- No dependencies
- Supports cache by Last-Modified

###Custom config
You can specify custom config by passing `--cfg` parameter:
```bash
nano-server --cfg=./path/to/config.json
```

**Default config is:**
```json
{
  "host": "localhost",
  "port": 8888,
  "root": "public",
  "cacheControl": "public",
  "stubs": {
    "index": "index.html",
    "error": "error.html",
    "notFound": "404.html"
  },
  "mime": {
    ".html": "text/html",
    ".js": "application/x-javascript",
    ".css": "text/css",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    "default": "text/plain"
  }
}

```
I think that there is no need to explain ;)

*todo: tests*
