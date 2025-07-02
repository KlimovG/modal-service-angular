import { Injectable, signal, computed, WritableSignal, inject, Type, TemplateRef } from '@angular/core';
import { timer } from 'rxjs';
import { ModalState } from '@modal/ts/modal-state.interface';
import { ModalData } from '@modal/ts/modal-data.type';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	private modalQueue: WritableSignal<ModalState[]> = signal<ModalState[]>([]);
	private state: WritableSignal<ModalState> = signal<ModalState>({
		content: null,
		isOpen: false,
		animation: null,
		withOverlay: true,
	});
	public closeAnimationSpeed = 300;
	public modalState = this.state.asReadonly();

	private readonly router = inject(Router);
	private readonly actRouter = inject(ActivatedRoute);

	public get stateValue(): ModalState {
		return this.state();
	}

	public modalQueueLength = computed(() => this.modalQueue().length);

	public openModal(
		content: Type<any> | TemplateRef<any>,
		withOverlay: boolean = true,
		data?: ModalData
	) {
		const newModal: ModalState = {
			content,
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
				content: null,
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
					content: null,
					isOpen: false,
					animation: null,
					withOverlay: true,
					data: null,
				});
			}
		});
	}

	public toggleModal(content: Type<any> | TemplateRef<any>, withOverlay: boolean = true, data?: ModalData) {
		this.closeModal();
		timer(this.closeAnimationSpeed).subscribe(() => {
			this.openModal(content, withOverlay, data);
		});
	}

	async closeAndNavigate(link: string) {
		await this.router.navigate([link], { relativeTo: this.actRouter });
		timer(this.closeAnimationSpeed).subscribe(() => this.closeModal());
	}
}
