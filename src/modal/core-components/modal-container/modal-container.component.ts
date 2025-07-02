import { Component, Type, input, ChangeDetectionStrategy, TemplateRef, computed } from '@angular/core';
import { ModalState } from '@modal/ts/modal-state.interface';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';


@Component({
	selector: 'app-modal-container',
	templateUrl: './modal-container.component.html',
	styleUrl: './modal-container.component.scss',
	imports: [NgComponentOutlet, NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContainerComponent {
	public modalState = input.required<ModalState>();

	public isTemplateRef(content: Type<any> | TemplateRef<any>): content is TemplateRef<any> {
		return content instanceof TemplateRef;
	}

	public templateContent = computed(() => {
		const content = this.modalState().content;
		return this.isTemplateRef(content) ? content : null;
	});

	public componentContent = computed(() => {
		const content = this.modalState().content;
		return !this.isTemplateRef(content) ? content : null;
	});

}
