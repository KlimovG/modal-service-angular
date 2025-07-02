import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { timer } from 'rxjs';
import { ModalState } from '@modal/ts/modal-state.interface';
import { ModalType } from '@modal/ts/modal-type.enum';
import { ModalData } from '@modal/ts/modal-data.type';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	private modalQueue: WritableSignal<ModalState[]> = signal<ModalState[]>([]);
	private state: WritableSignal<ModalState> = signal<ModalState>({
		type: null,
		isOpen: false,
		animation: null,
		withOverlay: true,
	});
	private closeAnimationSpeed = 300;
	public modalState = this.state.asReadonly();

	public get stateValue(): ModalState {
		return this.state();
	}

	public modalQueueLength = computed(() => this.modalQueue().length);

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
		this.modalQueue.update(queue => [...queue, newModal]);
		// Если окно еще не открыто (очередь только что пополнилась)
		if (this.modalQueue().length === 1) {
			this.showNextModal();
		}
	}

	private showNextModal() {
		if (this.modalQueue().length > 0) {
			const modal = this.modalQueue()[0];
			modal.isOpen = true;
			modal.animation = 'open';
			this.state.set(modal);
		} else {
			this.state.set({
				type: null,
				isOpen: false,
				animation: null,
				withOverlay: true,
				data: null,
			});
		}
	}

	public closeModal() {
		if (this.modalQueue().length === 0) {
			return;
		}
		const currentModal = this.modalQueue()[0];
		currentModal.animation = 'close';
		this.state.set(currentModal);

		timer(this.closeAnimationSpeed).subscribe(() => {
			if (this.modalQueue().length > 0) {
				this.modalQueue.set(this.modalQueue().slice(1));
				this.showNextModal();
			} else {
				this.state.set({
					type: null,
					isOpen: false,
					animation: null,
					withOverlay: true,
					data: null,
				});
			}
		});
	}

	public showNextModalImmediate(
		type: ModalType,
		withOverlay: boolean = true,
		data?: ModalData
	) {
		this.closeModal();
		timer(this.closeAnimationSpeed).subscribe(() => {
			this.openModal(type, withOverlay, data);
		});
	}
}
