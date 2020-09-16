import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Phone, PhoneCall, ArrowLeft, Play, Pause, PhoneOff, Anchor, Search, ZoomIn, PlusSquare, Plus, Minus, PlusCircle, UserPlus,
     CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft, CornerUpRight, PhoneIncoming, PhoneOutgoing } from 'angular-feather/icons';

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
    PlusCircle,
    UserPlus,
    Play,
    Pause,
    CornerLeftUp, 
    CornerRightDown, 
    CornerRightUp, 
    CornerUpLeft, 
    CornerUpRight,
    PhoneIncoming, 
    PhoneOutgoing  
};

@NgModule({
    imports: [FeatherModule.pick(icons)],
    exports: [FeatherModule]
})
export class IconsModule {}
