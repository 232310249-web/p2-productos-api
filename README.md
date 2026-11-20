# API REST de Productos

## Descripción del proyecto

Este proyecto consiste en una API REST desarrollada con Node.js y Express, que permite administrar productos mediante las operaciones CRUD: consultar, registrar, actualizar y eliminar.

La API utiliza el formato JSON para recibir y enviar información, aplicando los métodos HTTP y códigos de estado correspondientes.

## Tecnologías utilizadas

- Node.js
- Express
- CORS
- Postman

## Instalación

1. Descargar o clonar este repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Iniciar el servidor:

   ```bash
   npm start
   ```

5. Abrir la siguiente dirección:

   `http://localhost:3000`

## Rutas de la API

| Método HTTP | Ruta | Acción | Respuesta | Errores |
|---|---|---|---|---|
| GET | `/api/productos` | Consultar todos los productos | 200 | — |
| GET | `/api/productos/:id` | Consultar un producto | 200 | 404 |
| POST | `/api/productos` | Registrar un producto | 201 | 400 |
| PUT | `/api/productos/:id` | Actualizar un producto | 200 | 400, 404 |
| DELETE | `/api/productos/:id` | Eliminar un producto | 204 | 404 |

## Ejemplo de petición

**Registrar un producto**

Método: POST

URL: `http://localhost:3000/api/productos`

Body (JSON):

```json
{
  "nombre": "Monitor",
  "precio": 2500,
  "stock": 5
}
```

## Ejemplo de respuesta

Código de estado: 201 Created

```json
{
  "id": 3,
  "nombre": "Monitor",
  "precio": 2500,
  "stock": 5
}
```

## Validación de datos

La API verifica que:

- El nombre sea obligatorio y de tipo texto.
- El precio sea un número mayor o igual a cero.
- El stock sea un número entero mayor o igual a cero.

Si los datos no son correctos, devuelve el código 400 con una lista de errores.

## Códigos de estado utilizados

- 200: Petición realizada correctamente.
- 201: Producto creado correctamente.
- 204: Producto eliminado correctamente, sin contenido de respuesta.
- 400: Datos incorrectos.
- 404: Producto o ruta no encontrada.

## Almacenamiento

Los productos se almacenan temporalmente en memoria. Por lo tanto, los cambios se pierden cuando se reinicia el servidor.

## Autor

Práctica P2 - Crear una API REST propia con Node.js y Express.

Programación Web - Grupo 4X7B.