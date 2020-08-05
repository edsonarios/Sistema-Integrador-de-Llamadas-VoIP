import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteroper'
})
export class FilteroperPipe implements PipeTransform {

  transform(lista: any[],texto:string): any[] {
    console.log(lista);
    if (!texto) {
      return lista;
  }
  return lista.filter((user) => user.numero.includes(texto));
  }

}
