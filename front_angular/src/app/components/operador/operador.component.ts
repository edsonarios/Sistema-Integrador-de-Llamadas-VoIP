import { Component } from '@angular/core';


@Component({
  selector: 'operador-pages',
  styleUrls: ['../../sass/main.scss'],
  template: `
    <template-dashboard>
    <router-outlet></router-outlet>
	</template-dashboard>
  `,
})
export class OperadorComponent {

}
