import { PortalShowAnimationType } from './portal-show-animation.type';
import { Type, TemplateRef } from '@angular/core';
import { PortalData } from './portal-data.type';

export interface PortalState {
	isOpen: boolean;
	content: Type<unknown> | TemplateRef<unknown>;
	animation: PortalShowAnimationType;
	withOverlay?: boolean;
	data?: PortalData;
}
