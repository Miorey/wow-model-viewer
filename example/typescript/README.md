Create your app
```bash
npm install -g typescript
npm ci
npx webpack --config webpack.config.js
```

If you have webstorm or other ide with http-server implementation just run it.
Else you can install node http-server:
```bash
npm install http-server -g 
```

Run the server:
```bash
http-server .
```
With http-server just go here http://127.0.0.1:8080/demo.html