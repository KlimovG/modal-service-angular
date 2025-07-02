import { Component, inject } from '@angular/core';
import { SmartModalContainerComponent, ModalService } from "../modal";
import { ModalExitComponent } from '@modal/components/modal-exit/modal-exit.component';

@Component({
  selector: 'app-root',
  imports: [SmartModalContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portal-service';
  private readonly modalService: ModalService = inject(ModalService);

  openModal() {
    this.modalService.openModal(ModalExitComponent);
  }
}
