import { Component, Type, input, ChangeDetectionStrategy, TemplateRef, computed } from '@angular/core';
import { PortalState } from '../../ts/portal-state.interface';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';


@Component({
	selector: 'app-portal-container',
	templateUrl: './portal-container.component.html',
	styleUrl: './portal-container.component.scss',
	imports: [NgComponentOutlet, NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalContainerComponent {
	public portalState = input.required<PortalState>();

	public isTemplateRef(content: Type<unknown> | TemplateRef<unknown>): content is TemplateRef<unknown> {
		return content instanceof TemplateRef;
	}

	public templateContent = computed(() => {
		const content = this.portalState().content;
		return this.isTemplateRef(content) ? content : null;
	});

	public componentContent = computed(() => {
		const content = this.portalState().content;
		return !this.isTemplateRef(content) ? content : null;
	});

}
