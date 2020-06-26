import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalaService } from '@services/sala.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'detalleSala',
  templateUrl: './detalle_sala.component.html',
  providers: [SalaService],
})
export class DetalleSalaComponent implements OnInit {
  public Nombre;
  public Descripcion;
  public Habilitado;
  private Sala;
  constructor(private router: Router, private serviceSala: SalaService) {
    this.Sala = JSON.parse(localStorage.getItem('Sala'));
    this.Nombre = this.Sala.ContextSala;
    this.Descripcion = this.Sala.descripcion;
    this.Habilitado = this.Sala.Switch;
  }

  ngOnInit() {
    this.ObtenerSipAndIax();
  }
  ObtenerSipAndIax() {
    console.log('Entra');
    this.serviceSala.ParticipantesSala(this.Nombre).subscribe(
      (response) => {
        console.log(response);
        console.log('Logintud :' + response.length);
      },
      (er) => console.log(er),
      () => console.log('terminado')
    );
  }
  eliminarSala() {
    Swal.fire({
      title: 'Esta seguro de eliminar la Sala?',
      text: 'Los datos desapareceran',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si estoy seguro',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          title: 'Sala Eliminada',
          showConfirmButton: false,
          timer: 1500,
        });

        this.serviceSala.deleteSala(this.Nombre).subscribe(
          (response) => {
            console.log('Eliminado');
          },
          (error) => console.log(error)
        );
        this.router.navigate(['/Administrador/Salas']);
      }
    });
  }
}
