import { Component, inject } from '@angular/core';
import { SmartPortalContainerComponent, PortalService } from "../portal";
import { ModalTestComponent } from '../portal/components/modal-test/modal-test.component';

@Component({
  selector: 'app-root',
  imports: [SmartPortalContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portal-service';
  private readonly portalService: PortalService = inject(PortalService);


  openModal() {
      this.portalService.openPortal(ModalTestComponent, false, { name: 'Егор', id: 333 });
  }
}
