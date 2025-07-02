import { Type } from '@angular/core';
import { ModalExitComponent } from '@modal/components/modal-exit/modal-exit.component';
import { ModalBaseComponent } from '@modal/core-components/modal-base/modal-base.component';


export enum ModalType {
	//выход из приложения
	EXIT = 'EXIT',
}

export const modalTypeMapper: Record<ModalType, Type<ModalBaseComponent>> = {
	[ModalType.EXIT]: ModalExitComponent,
};
