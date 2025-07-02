import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { ModalService } from '@modal/service/modal.service';

@Component({
	selector: 'app-modal-test',
	template: `
		<div class="modal-component__container">
			<div class="test">
				<h2 class="test__title">Выбери действие с модалками</h2>
				<button class="test__btn" (click)="toggleModal()">Переключить модалку</button>
				<button class="test__btn" (click)="openModal()">Добавить модалку в очередь</button>
				<button class="test__btn" (click)="closeModal()">Закрыть модалку</button>
			</div>
		</div>
	`,
	styleUrl: './modal-test.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTestComponent {
	private readonly modalService: ModalService = inject(ModalService);

	openModal() {
		this.modalService.openModal(ModalTestComponent);
	}

	toggleModal() {
		this.modalService.toggleModal(ModalTestComponent);
	}

	closeModal() {
		this.modalService.closeModal();
	}
}
