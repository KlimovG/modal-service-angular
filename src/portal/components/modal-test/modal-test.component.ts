import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { PortalService } from '../../service/portal.service';

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
	private readonly modalService: PortalService = inject(PortalService);

	openModal() {
		this.modalService.openPortal(ModalTestComponent);
	}

	toggleModal() {
		this.modalService.togglePortal(ModalTestComponent);
	}

	closeModal() {
		this.modalService.closePortal();
	}
}
