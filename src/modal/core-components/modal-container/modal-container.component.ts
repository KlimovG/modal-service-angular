import { Component, Type, input, ChangeDetectionStrategy } from '@angular/core';
import { ModalState } from '@modal/ts/modal-state.interface';
import { modalTypeMapper } from '@modal/ts';
import { NgComponentOutlet } from '@angular/common';
import { ModalBaseComponent } from '@modal/core-components/modal-base/modal-base.component';

@Component({
	selector: 'app-modal-container',
	templateUrl: './modal-container.component.html',
	styleUrl: './modal-container.component.scss',
	imports: [NgComponentOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContainerComponent {
	public modalState = input.required<ModalState>();

	get activeModal(): Type<ModalBaseComponent> {
		return modalTypeMapper[this.modalState().type];
	}
}
