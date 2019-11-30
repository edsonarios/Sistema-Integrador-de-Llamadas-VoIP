"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
exports.Entrance = animations_1.trigger('SladeIn', [
    animations_1.transition(':enter', [
        animations_1.style({
            opacity: 0,
            transform: 'translateY(-100%)'
        }),
        animations_1.animate('500ms ease-in', animations_1.style({
            opacity: 1,
            transform: 'translateY(0%)'
        }))
    ]),
    animations_1.transition(':leave', [
        animations_1.style({
            opacity: 1,
            transform: 'translateY(0%)'
        }),
        animations_1.animate('500ms ease-in', animations_1.style({
            opacity: 0,
            transform: 'translateY(-100%)'
        }))
    ])
]);
exports.Quit = animations_1.trigger('SladeOff', [
    animations_1.transition(':enter', [
        animations_1.style({
            opacity: 1,
            transform: 'translateY(100%)'
        }),
        animations_1.animate('500ms ease-in', animations_1.style({
            opacity: 1,
            transform: 'translateY(0%)'
        }))
    ]),
    animations_1.transition(':leave', [
        animations_1.style({
            opacity: 1,
            transform: 'translateY(0%)'
        }),
        animations_1.animate('500ms ease-in', animations_1.style({
            opacity: 1,
            transform: 'translateY(100%)'
        }))
    ])
]);
exports.EnterLeave = animations_1.trigger('flyIn', [
    animations_1.transition(':enter', [
        animations_1.style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
        animations_1.animate('500ms ease-in', animations_1.style({
            opacity: 1,
            transform: 'translateX(0%)'
        }))
    ]),
    animations_1.transition(':leave', [
        animations_1.style({
            opacity: 1,
            transform: 'translateX(0%)'
        }),
        animations_1.animate('500ms ease-in', animations_1.style({
            opacity: 1,
            transform: 'translateX(-100%)'
        }))
    ])
]);
exports.DesktopAnimation = animations_1.trigger('FadeIn', [
    animations_1.transition(':enter', [
        animations_1.style({
            opacity: 0,
        }),
        animations_1.animate('500ms ease-in', animations_1.style({
            opacity: 1,
        }))
    ]),
    animations_1.transition(':leave', [
        animations_1.style({
            opacity: 1,
        }),
        animations_1.animate('500ms ease-in', animations_1.style({
            opacity: 0,
        }))
    ])
]);
