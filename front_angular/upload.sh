#!/bin/bash
echo "Inicializando el nuevo commit :"
git add -A
echo "Escribe el nuevo nombre del commit :"
read input
git commit -m "$input"
git push origin master