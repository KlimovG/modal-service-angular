import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalState } from '@modal/ts/modal-state.interface';
import { ModalType } from '@modal/ts/modal-type.enum';
import { ModalData } from '@modal/ts/modal-data.type';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	private modalQueue: ModalState[] = [];
	private state$ = new BehaviorSubject<ModalState>({
		type: null,
		isOpen: false,
		animation: null,
		withOverlay: true,
	});
	private closeAnimationSpeed = 300;
	private errorDelay = 0; // задержка для модалок ошибок
	public modalState$: Observable<ModalState> = this.state$.asObservable();

	public get state(): ModalState {
		return this.state$.value;
	}

	public get modalQueueLength(): number {
		return this.modalQueue.length;
	}

	public openModal(
		type: ModalType,
		withOverlay: boolean = true,
		data?: ModalData
	) {
		const newModal: ModalState = {
			type,
			isOpen: false,
			animation: null,
			withOverlay,
			data,
		};
		// Добавляем новое модальное окно в очередь
		this.modalQueue.push(newModal);
		// Если окно еще не открыто (очередь только что пополнилась)
		if (this.modalQueue.length === 1) {
			this.showNextModal();
		}
	}

	private showNextModal() {
		if (this.modalQueue.length > 0) {
			const modal = this.modalQueue[0];
			modal.isOpen = true;
			modal.animation = 'open';
			this.state$.next(modal);
		} else {
			this.state$.next({
				type: null,
				isOpen: false,
				animation: null,
				withOverlay: true,
				data: null,
			});
		}
	}

	public closeModal() {
		if (this.modalQueue.length === 0) {
			return;
		}
		const currentModal = this.modalQueue[0];
		currentModal.animation = 'close';
		this.state$.next(currentModal);

		setTimeout(() => {
			if (this.modalQueue.length > 0) {
				this.modalQueue.shift();
				this.showNextModal();
			} else {
				this.state$.next({
					type: null,
					isOpen: false,
					animation: null,
					withOverlay: true,
					data: null,
				});
			}
		}, this.closeAnimationSpeed + 1);
	}

	public showNextModalImmediate(
		type: ModalType,
		withOverlay: boolean = true,
		data?: ModalData
	) {
		this.closeModal();
		setTimeout(() => {
			this.openModal(type, withOverlay, data);
		}, this.closeAnimationSpeed);
	}
}
