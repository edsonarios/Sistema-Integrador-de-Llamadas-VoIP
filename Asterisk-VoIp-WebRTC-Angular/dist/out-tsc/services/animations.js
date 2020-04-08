import { animate, style, transition, trigger } from '@angular/animations';
export var Entrance = trigger('SladeIn', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateX(100%)'
        }),
        animate('500ms ease-in', style({
            opacity: 1,
            transform: 'translateX(0%)'
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            transform: 'translateX(0%)'
        }),
        animate('500ms ease-in', style({
            opacity: 0,
            transform: 'translateX(100%)'
        }))
    ])
]);
export var Quit = trigger('SladeOff', [
    transition(':enter', [
        style({
            opacity: 1,
            transform: 'translateX(-100%)'
        }),
        animate('500ms ease-in', style({
            opacity: 1,
            transform: 'translateX(0%)'
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            transform: 'translateX(0%)'
        }),
        animate('500ms ease-in', style({
            opacity: 1,
            transform: 'translateX(-100%)'
        }))
    ])
]);
export var EnterLeave = trigger('flyIn', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
        animate('500ms ease-in', style({
            opacity: 1,
            transform: 'translateX(0%)'
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            transform: 'translateX(0%)'
        }),
        animate('500ms ease-in', style({
            opacity: 1,
            transform: 'translateX(-100%)'
        }))
    ])
]);
export var DesktopAnimation = trigger('FadeIn', [
    transition(':enter', [
        style({
            opacity: 0,
        }),
        animate('500ms ease-in', style({
            opacity: 1,
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
        }),
        animate('500ms ease-in', style({
            opacity: 0,
        }))
    ])
]);
