import { Injectable, signal, computed, WritableSignal, inject, Type, TemplateRef } from '@angular/core';
import { timer } from 'rxjs';
import { PortalState } from '../ts/portal-state.interface';
import { PortalData } from '../ts/portal-data.type';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class PortalService {
	private portalQueue: WritableSignal<PortalState[]> = signal<PortalState[]>([]);
	private state: WritableSignal<PortalState> = signal<PortalState>({
		content: null,
		isOpen: false,
		animation: null,
		withOverlay: true,
		data: {},
	});
	private closeAnimationSpeed = 300;
	private readonly router = inject(Router);
	private readonly actRouter = inject(ActivatedRoute);

	portalState = this.state.asReadonly();

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
	 * @returns {PortalState} Текущее состояние модального окна
	 */
	get stateValue(): PortalState {
		return this.state();
	}

	/**
	 * Вычисляемое свойство, возвращающее количество модальных окон в очереди
	 */
	portalQueueLength = computed(() => this.portalQueue().length);

	/**
	 * Открывает модальное окно с указанным содержимым
	 * @param {Type<any> | TemplateRef<any>} content - Компонент или шаблон для отображения в модальном окне
	 * @param {boolean} [withOverlay=true] - Показывать ли полупрозрачный оверлей за модальным окном
	 * @param {PortalData} [data] - Данные для передачи в модальное окно
	 */
	openPortal(
		content: Type<unknown> | TemplateRef<unknown>,
		withOverlay = true,
		data?: PortalData
	) {
		const newModal: PortalState = {
			content,
			isOpen: false,
			animation: null,
			withOverlay,
			data: data || {},
		};
		// Добавляем новое модальное окно в очередь
		this.portalQueue.update(queue => [...queue, newModal]);
		// Если окно еще не открыто (очередь только что пополнилась)
		if (this.portalQueue().length === 1) {
			this.showNextPortal();
		}
	}

	/**
	 * Закрывает текущее активное модальное окно с анимацией
	 * После закрытия автоматически показывает следующее модальное окно из очереди, если таковое имеется
	 */
	closePortal() {
		if (this.portalQueue().length === 0) {
			return;
		}
		const currentModal = this.portalQueue()[0];
		currentModal.animation = 'close';
		this.state.set(currentModal);

		timer(this.closeAnimationSpeed).subscribe(() => {
			if (this.portalQueue().length > 0) {
				this.portalQueue.set(this.portalQueue().slice(1));
				this.showNextPortal();
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
	 * @param {PortalData} [data] - Данные для передачи в новое модальное окно
	 */
	togglePortal(content: Type<unknown> | TemplateRef<unknown>, withOverlay = true, data?: PortalData) {
		this.closePortal();
		timer(this.closeAnimationSpeed).subscribe(() => {
			this.openPortal(content, withOverlay, data);
		});
	}

	/**
	 * Закрывает модальное окно и выполняет навигацию по указанному маршруту
	 * @param {string} link - Маршрут для навигации
	 * @returns {Promise<void>} Promise, который разрешается после завершения навигации
	 */
	async closeAndNavigate(link: string) {
		await this.router.navigate([link], { relativeTo: this.actRouter });
		timer(this.closeAnimationSpeed).subscribe(() => this.closePortal());
	}

	/**
	 * Показывает следующее модальное окно из очереди или сбрасывает состояние, если очередь пуста
	 * @private
	 */
	private showNextPortal() {
		if (this.portalQueue().length > 0) {
			const modal = this.portalQueue()[0];
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
