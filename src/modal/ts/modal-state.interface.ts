import { ModalShowAnimationType } from './modal-show-animation.type';
import { ModalType } from './modal-type.enum';
import { ModalData } from './modal-data.type';

export interface ModalState {
	isOpen: boolean;
	type: ModalType;
	animation: ModalShowAnimationType;
	withOverlay?: boolean;
	data?: ModalData;
}
