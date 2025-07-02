import { Type } from '@angular/core';
import { ModalExitComponent } from '@modal/components/modal-exit/modal-exit.component';
import { ModalType } from './modal-type.enum';

export const modalTypeMapper: Record<ModalType, Type<any>> = {
	[ModalType.EXIT]: ModalExitComponent,
}; 