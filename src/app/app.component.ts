import { Component, inject } from '@angular/core';
import { SmartModalContainerComponent, ModalService, ModalType } from "../modal";

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
    this.modalService.openModal(ModalType.EXIT);
  }
}
