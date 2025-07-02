import {
	Component,
	inject,
	OnDestroy,
	Signal,
	signal,
	input,
	ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../service/modal.service';
import { ModalShowAnimationType } from '@modal/ts/modal-show-animation.type';
import { ModalType } from '@modal/ts/modal-type.enum';
import { ModalData } from '@modal/ts/modal-data.type';
import { timer } from 'rxjs';

@Component({
	selector: 'app-modal-base',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalBaseComponent {
	public animation = input<ModalShowAnimationType | undefined>();
	readonly modal = inject(ModalService);
	readonly router = inject(Router);
	readonly actRouter = inject(ActivatedRoute);
	animationEnds$ = signal<boolean>(false);

	constructor() {
		timer(0).subscribe(() => {
			this.animationEnds$.set(true);
		});
	}

	closeModal() {
		this.modal.closeModal();
	}

	toggleModal(type: ModalType, withOverlay: boolean = true, data?: ModalData) {
		this.closeModal();
		timer(300).subscribe(() => {
			this.openModal(type, withOverlay, data);
		});
	}

	openModal(type: ModalType, withOverlay: boolean = true, data?: ModalData) {
		this.modal.openModal(type, withOverlay, data);
	}

	async closeAndNavigate(link: string) {
		await this.router.navigate([link], { relativeTo: this.actRouter });
		timer(300).subscribe(() => this.closeModal());
	}
}
