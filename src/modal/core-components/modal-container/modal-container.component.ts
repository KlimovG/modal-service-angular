import { Component, Type, input, ChangeDetectionStrategy, TemplateRef, computed, Signal } from '@angular/core';
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

	public templateContent: Signal<TemplateRef<any> | undefined> = computed(() =>
		this.isTemplateRef(this.modalState().content) ? (this.modalState().content as TemplateRef<any>) : undefined
	);

	public componentContent: Signal<Type<any> | undefined> = computed(() =>
		!this.isTemplateRef(this.modalState().content) ? (this.modalState().content as Type<any>) : undefined
	);
}
