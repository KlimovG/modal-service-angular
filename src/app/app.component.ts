import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { SmartModalContainerComponent, ModalService } from "../modal";
import { ModalTestComponent } from '@modal/components/modal-test/modal-test.component';

@Component({
  selector: 'app-root',
  imports: [SmartModalContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portal-service';
  private readonly modalService: ModalService = inject(ModalService);
  @ViewChild('myTemplate') myTemplate!: TemplateRef<any>;

  openModal() {
      this.modalService.openModal(ModalTestComponent, false, { name: 'Егор', id: 333 });
  }
}
