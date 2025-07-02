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
		data: {},
	});
	private closeAnimationSpeed = 300;
	private readonly router = inject(Router);
	private readonly actRouter = inject(ActivatedRoute);
	
	modalState = this.state.asReadonly();

	/**
	 * Получает текущую скорость анимации закрытия модального окна в миллисекундах
	 * @returns {number} Скорость анимации в миллисекундах
	 */
	get animationSpeed(): number {
		return this.closeAnimationSpeed;
	}

	/**
	 * Устанавливает скорость анимации закрытия модального окна
	 * @param {number} speed - Скорость анимации в миллисекундах
	 */
	set animationSpeed(speed: number) {
		this.closeAnimationSpeed = speed;
	}

	/**
	 * Получает текущее состояние модального окна
	 * @returns {ModalState} Текущее состояние модального окна
	 */
	get stateValue(): ModalState {
		return this.state();
	}

	/**
	 * Вычисляемое свойство, возвращающее количество модальных окон в очереди
	 */
	modalQueueLength = computed(() => this.modalQueue().length);

	/**
	 * Открывает модальное окно с указанным содержимым
	 * @param {Type<any> | TemplateRef<any>} content - Компонент или шаблон для отображения в модальном окне
	 * @param {boolean} [withOverlay=true] - Показывать ли полупрозрачный оверлей за модальным окном
	 * @param {ModalData} [data] - Данные для передачи в модальное окно
	 */
	openModal(
		content: Type<any> | TemplateRef<any>,
		withOverlay: boolean = true,
		data?: ModalData
	) {
		const newModal: ModalState = {
			content,
			isOpen: false,
			animation: null,
			withOverlay,
			data: data || {},
		};
		// Добавляем новое модальное окно в очередь
		this.modalQueue.update(queue => [...queue, newModal]);
		// Если окно еще не открыто (очередь только что пополнилась)
		if (this.modalQueue().length === 1) {
			this.showNextModal();
		}
	}

	/**
	 * Закрывает текущее активное модальное окно с анимацией
	 * После закрытия автоматически показывает следующее модальное окно из очереди, если таковое имеется
	 */
	closeModal() {
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
					data: {},
				});
			}
		});
	}

	/**
	 * Закрывает текущее модальное окно и открывает новое с указанным содержимым
	 * @param {Type<any> | TemplateRef<any>} content - Компонент или шаблон для отображения в новом модальном окне
	 * @param {boolean} [withOverlay=true] - Показывать ли полупрозрачный оверлей за модальным окном
	 * @param {ModalData} [data] - Данные для передачи в новое модальное окно
	 */
	toggleModal(content: Type<any> | TemplateRef<any>, withOverlay: boolean = true, data?: ModalData) {
		this.closeModal();
		timer(this.closeAnimationSpeed).subscribe(() => {
			this.openModal(content, withOverlay, data);
		});
	}

	/**
	 * Закрывает модальное окно и выполняет навигацию по указанному маршруту
	 * @param {string} link - Маршрут для навигации
	 * @returns {Promise<void>} Promise, который разрешается после завершения навигации
	 */
	async closeAndNavigate(link: string) {
		await this.router.navigate([link], { relativeTo: this.actRouter });
		timer(this.closeAnimationSpeed).subscribe(() => this.closeModal());
	}

	/**
	 * Показывает следующее модальное окно из очереди или сбрасывает состояние, если очередь пуста
	 * @private
	 */
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
				data: {},
			});
		}
	}
}
