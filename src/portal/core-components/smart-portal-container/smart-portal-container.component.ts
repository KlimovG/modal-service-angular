import { Component, inject, Signal } from '@angular/core';
import { PortalState } from '../../ts/portal-state.interface';
import { PortalService } from '../../service/portal.service';
import { PortalContainerComponent } from '../portal-container/portal-container.component';

@Component({
	selector: 'app-smart-portal-container',
	template: `
    <app-portal-container
      [portalState]="portalState()"></app-portal-container>`,
	imports: [PortalContainerComponent],
	host: {
		'[style.--portal-animation-speed.ms]': 'animationSpeed',
	},
})
export class SmartPortalContainerComponent {
  private readonly service: PortalService = inject(PortalService);
  portalState: Signal<PortalState> = this.service.portalState;
  animationSpeed = this.service.animationSpeed;
}
