import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ModalType } from '@modal/ts';
import { ModalService } from '@modal/service/modal.service';

@Component({
	selector: 'app-modal-exit',
	template: `
		<div class="modal-component__container">
			<div class="exit">
				<h2 class="exit__title title title__level--1">Выбери действие с модалками</h2>
				<button class="exit__btn btn btn--secondary" (click)="toggleModal()">Открыть другую модалку</button>
				<button class="exit__btn btn btn--primary" (click)="closeModal()">Закрыть модалку</button>
			</div>
		</div>
	`,
	styleUrl: './modal-exit.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class ModalExitComponent {
	readonly ModalType = ModalType;
	private readonly modalService: ModalService = inject(ModalService);

	toggleModal() {
		this.modalService.toggleModal(ModalType.EXIT);
	}

	closeModal() {
		this.modalService.closeModal();
	}
}
