import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalState } from '@modal/ts/modal-state.interface';
import { AsyncPipe } from '@angular/common';
import { ModalService } from '@modal/service/modal.service';
import { ModalContainerComponent } from '@modal/core-components/modal-container/modal-container.component';

@Component({
	selector: 'app-smart-modal-container',
	template: ` <app-modal-container
		[modalState]="modalState$ | async"></app-modal-container>`,
	imports: [ModalContainerComponent, AsyncPipe],
	standalone: true,
})
export class SmartModalContainerComponent {
	public modalState$: Observable<ModalState>;
	constructor(private service: ModalService) {
		this.modalState$ = this.service.modalState$;
	}
}
