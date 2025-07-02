import { Component, Signal } from '@angular/core';
import { ModalState } from '@modal/ts/modal-state.interface';
import { ModalService } from '@modal/service/modal.service';
import { ModalContainerComponent } from '@modal/core-components/modal-container/modal-container.component';

@Component({
	selector: 'app-smart-modal-container',
	template: ` <app-modal-container
		[modalState]="modalState()"></app-modal-container>`,
	imports: [ModalContainerComponent],
	host: { 
		'[style.--modal-animation-speed.ms]': 'service.closeAnimationSpeed',
	},
})
export class SmartModalContainerComponent {
	public modalState: Signal<ModalState>;
	constructor(private service: ModalService) {
		this.modalState = this.service.modalState;
	}
}
