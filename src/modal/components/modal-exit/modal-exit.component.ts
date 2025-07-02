import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalBaseComponent } from '@modal/core-components/modal-base/modal-base.component';
import { ModalType } from '@modal/ts';

@Component({
	selector: 'app-modal-user',
	template: `
		<div class="modal-component__container">
			<div class="exit">
				<h2 class="exit__title title title__level--1">Вы точно хотите выйти?</h2>
				<button class="exit__btn btn btn--secondary" (click)="toggleModal(ModalType.EXIT)">Да</button>
				<button class="exit__btn btn btn--primary" (click)="closeModal()">Нет</button>
			</div>
		</div>
	`,
	styleUrl: './modal-exit.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalExitComponent extends ModalBaseComponent {
	readonly ModalType = ModalType;
}
