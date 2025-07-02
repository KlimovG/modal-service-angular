import { Component } from '@angular/core';
import { ModalBaseComponent } from '@modal/core-components/modal-base/modal-base.component';

@Component({
	selector: 'app-modal-user',
	templateUrl: './modal-exit.component.html',
	styleUrl: './modal-exit.component.scss',
})
export class ModalExitComponent extends ModalBaseComponent {
	exitApp() {}
}
