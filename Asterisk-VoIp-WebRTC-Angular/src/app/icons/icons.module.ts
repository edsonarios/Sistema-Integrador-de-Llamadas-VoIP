import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Phone, PhoneCall, ArrowLeft, PhoneOff, Anchor, Search, ZoomIn, PlusSquare, Plus, Minus, PlusCircle } from 'angular-feather/icons';

const icons = {
    Phone,
    PhoneCall,
    ArrowLeft,
    PhoneOff,
    Anchor,
    Search,
    ZoomIn,
    PlusSquare,
    Plus,
    Minus,
    PlusCircle
};

@NgModule({
    imports: [FeatherModule.pick(icons)],
    exports: [FeatherModule]
})
export class IconsModule {}
