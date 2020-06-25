import { Component, OnInit } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-registro-llamadas',
    templateUrl: './registro-llamadas.component.html',
    styleUrls: ['./registro-llamadas.component.scss']
})
export class RegistroLlamadasComponent implements OnInit {
    phoneIcon = faPhone;
    constructor() {}

    ngOnInit(): void {}
}
