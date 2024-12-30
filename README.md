# MFP - Autoservicios

## Requisitos

- Docker

## Pasos para hacer build del proyecto

1. Descargar imagen de docker:

```sh
docker pull node:22-bookworm
```

2. Hacer build

```sh
docker run --rm -v $(pwd):/app -w /app node:22-bookworm bash -c "
npm install &&
npm run build
"
```
