import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Phone, PhoneCall, ArrowLeft, PhoneOff, Anchor, Search, ZoomIn, PlusSquare, Plus, Minus } from 'angular-feather/icons';

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
    Minus
};

@NgModule({
    imports: [FeatherModule.pick(icons)],
    exports: [FeatherModule]
})
export class IconsModule {}
