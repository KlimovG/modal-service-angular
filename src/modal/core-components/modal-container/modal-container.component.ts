import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { ModalState } from '@modal/ts/modal-state.interface';
import { modalTypeMapper } from '@modal/ts/modal-type.enum';
import { NgClass, NgComponentOutlet, NgStyle } from '@angular/common';
import { ModalBaseComponent } from '@modal/core-components/modal-base/modal-base.component';

@Component({
	selector: 'app-modal-container',
	templateUrl: './modal-container.component.html',
	styleUrl: './modal-container.component.scss',
	standalone: true,
	imports: [NgStyle, NgClass, NgComponentOutlet],
})
export class ModalContainerComponent {
	@Input() modalState: ModalState;

	get activeModal(): Type<ModalBaseComponent> {
		return modalTypeMapper[this.modalState.type];
	}
}
