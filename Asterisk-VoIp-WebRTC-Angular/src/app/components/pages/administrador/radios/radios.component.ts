import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalaService } from '@services/sala.service';

@Component({
  selector: 'radios',
  templateUrl: './radios.component.html',
  providers: [SalaService],
})
export class RadiosComponent implements OnInit {
  public radios = [];

  constructor(private router: Router, private salaService: SalaService) {}

  ngOnInit() {
    this.recibirRadios();
    console.log(this.radios);
  }

  recibirRadios() {
    this.salaService.listarSalas().subscribe(
      (response) => {
        response.forEach((element) => {
          var name = element.nombreSala;
          name = name.toLowerCase();
          if (name.includes('radio')) {
            this.radios.push(element);
          }
        });
      },
      (er) => console.log(er),
      () => console.log('terminado')
    );
  }
}