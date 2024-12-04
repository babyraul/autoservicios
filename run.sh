#!/bin/bash
# Ejecutar el servidor de desarrollo
# Mostrar opciones al usuario
echo "Selecciona una opción para ejecutar el proyecto:"
echo "1) npm run dev"
echo "2) npx vite --host 192.168.212.81"
read -p "Introduce el número de la opción: " opcion

case $opcion in
    1)
        echo "Iniciando el servidor de desarrollo con npm run dev..."
        npm run dev
        ;;
    2)
        echo "Iniciando Vite en la dirección 192.168.212.79..."
        npx vite --host 192.168.212.79
        ;;
    *)
        echo "Opción no válida. Saliendo del script."
        exit 1
        ;;
esac