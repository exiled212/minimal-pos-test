Requisitos:

- node.js
- pnpm
- pav2

para iniciar este proyecto primero tiene que instalar las dependencias con

```
pnpm install
```

Luego de esto, solo tiene que crear el archivo .env desde example.env con sus respectivos datos.

luego de tener esto listo, puede iniciar el proyecto con

```
pnpm start
```

Tenga en cuenta que una vez inicie el proyecto, automaticamente por detras empezara a realizar request a pav2 a orders y toda orden que tome, hara el flujo correspondiente.

El sistema guarda un archivo data.log el cual guardara todos los logs de error que puedan pasar durante los request, si necesita validar algun error puede buscarlo ahí.
