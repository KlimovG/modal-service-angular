# Angular Modal Service

Этот проект предоставляет переиспользуемый сервис для управления модальными окнами в Angular-приложениях, используя современные практики Angular (сигналы, standalone components).

## Установка

Предполагается, что данный проект будет использоваться как библиотека в другом Angular проекте. Вы можете скопировать папку `src/modal` в свой проект или настроить публикацию как npm-пакета.

## Использование

### Импорт

Импортируйте `ModalService`, `SmartModalContainerComponent` и необходимые типы из главной точки входа:

```typescript
import { ModalService, SmartModalContainerComponent, ModalData } from './modal';
// Если папка modal находится в src, то путь будет примерно такой: 'src/modal'
```

### SmartModalContainerComponent

`SmartModalContainerComponent` является контейнером для всех модальных окон и должен быть размещен в корневом компоненте вашего приложения (например, `app.component.html`).

**app.component.html**

```html
<app-smart-modal-container></app-smart-modal-container>
```

**app.component.ts**

Убедитесь, что `SmartModalContainerComponent` импортирован в `imports` вашего `AppComponent` (или другого корневого компонента):

```typescript
import { Component } from '@angular/core';
import { SmartModalContainerComponent } from './modal'; // Укажите правильный путь

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SmartModalContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // ...
}
```

### Открытие модального окна

Для открытия модального окна используйте `ModalService`, передавая ссылку на компонент или `TemplateRef`:

```typescript
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ModalService, ModalData } from './modal'; // Укажите правильный путь
import { ModalExitComponent } from '@modal/components/modal-exit/modal-exit.component';

@Component({
  // ...
})
export class YourComponent {
  private readonly modalService: ModalService = inject(ModalService);

  @ViewChild('myTemplate') myTemplate: TemplateRef<any>;

  openExitModal() {
    this.modalService.openModal(ModalExitComponent);
  }

  openCustomModalWithData() {
    const data: ModalData = { id: 1, name: 'Пример данных' };
    this.modalService.openModal(ModalExitComponent, true, data);
  }

  openTemplateModal() {
    this.modalService.openModal(this.myTemplate);
  }
}
```

Для передачи данных в компонент модального окна используйте третий аргумент `data`. Эти данные будут доступны через `input()` в компоненте модального окна. Если вы используете `TemplateRef`, данные будут доступны через контекст шаблона.

```html
<!-- Пример использования TemplateRef в вашем компоненте -->
<ng-template #myTemplate let-data>
  <h2>Привет, {{ data.name }}!</h2>
  <p>Твой ID: {{ data.id }}</p>
</ng-template>
```

### Закрытие модального окна

Чтобы закрыть текущее модальное окно:

```typescript
this.modalService.closeModal();
```

### Переключение модальных окон

Для закрытия текущего и открытия нового модального окна:

```typescript
import { AnotherModalComponent } from './another-modal.component'; // Ваш новый компонент
this.modalService.toggleModal(AnotherModalComponent);
```

### Добавление новых модальных окон

1.  Создайте новый компонент модального окна (например, `src/app/custom-modal/custom-modal.component.ts`). Убедитесь, что он является `standalone` компонентом.
2.  Если вашему модальному компоненту нужны методы для управления модальным окном (закрытие, переключение), вы можете инъецировать `ModalService` напрямую:

    ```typescript
    import { Component, inject } from '@angular/core';
    import { ModalService } from '@modal/service/modal.service';

    @Component({
      selector: 'app-custom-modal',
      standalone: true,
      template: `<button (click)="modalService.closeModal()">Закрыть</button>`,
    })
    export class CustomModalComponent {
      private readonly modalService: ModalService = inject(ModalService);
    }
    ```

Это основные шаги для начала работы с вашим `portal-service` в других проектах. Если у вас возникнут дополнительные вопросы, Егор, дайте мне знать! 