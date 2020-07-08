import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtrobusqueda'
})
export class FiltrobusquedaPipe implements PipeTransform {
    transform(lista: any[], texto: string): any[] {
        if (!texto) {
            return lista;
        }
        return lista.filter((user) => user.nombre.toUpperCase().includes(texto.toUpperCase()));
    }
}
