import { ModalShowAnimationType } from './modal-show-animation.type';
import { Type, TemplateRef } from '@angular/core';
import { ModalData } from './modal-data.type';

export interface ModalState {
	isOpen: boolean;
	content: Type<any> | TemplateRef<any>;
	animation: ModalShowAnimationType;
	withOverlay?: boolean;
	data?: ModalData;
}
