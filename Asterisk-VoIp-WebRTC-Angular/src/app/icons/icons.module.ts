import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Phone, PhoneCall, ArrowLeft, PhoneOff } from 'angular-feather/icons';

const icons = {
	Phone,
	PhoneCall,
	ArrowLeft,
	PhoneOff
};

@NgModule({
	imports: [FeatherModule.pick(icons)],
	exports: [FeatherModule]
})
export class IconsModule {}
