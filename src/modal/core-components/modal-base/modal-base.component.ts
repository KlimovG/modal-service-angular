import {
	Component,
	inject,
	Input,
	OnDestroy,
	Signal,
	signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../service/modal.service';
import { ModalShowAnimationType } from '@modal/ts/modal-show-animation.type';
import { ModalType } from '@modal/ts/modal-type.enum';
import { ModalData } from '@modal/ts/modal-data.type';

@Component({
	selector: 'app-modal-base',
	template: '',
	standalone: true,
})
export class ModalBaseComponent {
	@Input() animation: ModalShowAnimationType;
	readonly modal = inject(ModalService);
	readonly router = inject(Router);
	readonly actRouter = inject(ActivatedRoute);
	animationEnds$ = signal<boolean>(false);

	constructor() {
		requestAnimationFrame(() => {
			setTimeout(() => {
				this.animationEnds$.set(true);
			});
		});
	}

	closeModal() {
		this.modal.closeModal();
	}

	toggleModal(type: ModalType, withOverlay: boolean = true, data?: ModalData) {
		this.closeModal();
		setTimeout(() => {
			this.openModal(type, withOverlay, data);
		}, 300);
	}

	openModal(type: ModalType, withOverlay: boolean = true, data?: ModalData) {
		this.modal.openModal(type, withOverlay, data);
	}

	async closeAndNavigate(link: string) {
		await this.router.navigate([link], { relativeTo: this.actRouter });
		setTimeout(() => this.closeModal(), 200);
	}
}
