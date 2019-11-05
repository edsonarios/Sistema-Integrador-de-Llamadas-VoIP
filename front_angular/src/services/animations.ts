import { animate, state, style, transition, trigger } from '@angular/animations';

export const Entrance=
	trigger('SladeIn',[
		transition(':enter',[
			style({
				opacity:0,
				transform: 'translateY(-80%)'
			}),
			animate('500ms ease-in',
				style({
					opacity: 1,
					transform: 'translateY(0%)'
				}))
			]),
		transition(':leave',[
			style({
				opacity:1,
				transform: 'translateY(0%)'
			}),
			animate('500ms ease-in',
				style({
					opacity: 0,
					transform: 'translateY(-80%)'
				}))
			])
		]);


export const Quit=
	trigger('SladeOff',[
		transition(':enter',[
			style({
				opacity:1,
				transform: 'translateY(80%)'
			}),
			animate('500ms ease-in',
				style({
					opacity: 1,
					transform: 'translateY(0%)'
				}))
			]),
		transition(':leave',[
			style({
				opacity:1,
				transform: 'translateY(0%)'
			}),
			animate('500ms ease-in',
				style({
					opacity: 1,
					transform: 'translateY(80%)'
				}))
			])
		]);
