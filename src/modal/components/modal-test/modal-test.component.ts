import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { ModalService } from '@modal/service/modal.service';

@Component({
	selector: 'app-modal-test',
	template: `
		<div class="modal-component__container">
			<div class="test">
				<h2 class="test__title title title__level--1">Выбери действие с модалками</h2>
				<button class="test__btn btn btn--secondary" (click)="toggleModal()">Открыть другую модалку</button>
				<button class="test__btn btn btn--primary" (click)="closeModal()">Закрыть модалку</button>
			</div>
		</div>
	`,
	styleUrl: './modal-test.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTestComponent {
	private readonly modalService: ModalService = inject(ModalService);

	toggleModal() {
		this.modalService.toggleModal(ModalTestComponent);
	}

	closeModal() {
		this.modalService.closeModal();
	}
}
