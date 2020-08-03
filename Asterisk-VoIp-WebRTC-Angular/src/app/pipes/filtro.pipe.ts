import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
    transform(lista: any[], texto: string): any[] {
        if (!texto) {
            return lista;
        }
        return lista.filter((user) => user.nombre.toUpperCase().includes(texto.toUpperCase()) || user.numeroSip.toUpperCase().includes(texto.toUpperCase()));
    }
}
