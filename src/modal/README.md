# Angular Modal Service

Этот проект предоставляет переиспользуемый сервис для управления модальными окнами в Angular-приложениях, используя современные практики Angular (сигналы, standalone components).

## Установка

Предполагается, что данный проект будет использоваться как библиотека в другом Angular проекте. Вы можете скопировать папку `src/modal` в свой проект или настроить публикацию как npm-пакета.

## Использование

### Импорт

Импортируйте `ModalService`, `SmartModalContainerComponent` и необходимые типы из главной точки входа:

```typescript
import { ModalService, SmartModalContainerComponent, ModalType, ModalData } from './modal';
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

Для открытия модального окна используйте `ModalService`:

```typescript
import { Component, inject } from '@angular/core';
import { ModalService, ModalType, ModalData } from './modal'; // Укажите правильный путь

@Component({
  // ...
})
export class YourComponent {
  private readonly modalService: ModalService = inject(ModalService);

  openExitModal() {
    this.modalService.openModal(ModalType.EXIT);
  }

  openCustomModalWithData() {
    const data: ModalData = { id: 1, name: 'Пример данных' };
    this.modalService.openModal(ModalType.CUSTOM_MODAL, true, data);
  }
}
```

*   `ModalType.EXIT`: Пример типа модального окна. Вам нужно определить свои типы модальных окон в `src/modal/ts/modal-type.enum.ts` и связать их с компонентами в `src/modal/ts/modal-type.mapper.ts`.
*   `withOverlay`: `boolean` (по умолчанию `true`) - определяет, показывать ли оверлей.
*   `data`: `ModalData` (опционально) - любые данные, которые вы хотите передать в открываемое модальное окно. Эти данные будут доступны через `input()` в компоненте модального окна.

### Закрытие модального окна

Чтобы закрыть текущее модальное окно:

```typescript
this.modalService.closeModal();
```

### Переключение модальных окон

Для закрытия текущего и открытия нового модального окна:

```typescript
this.modalService.toggleModal(ModalType.NEW_MODAL);
```

### Добавление новых модальных окон

1.  Создайте новый компонент модального окна (например, `src/app/custom-modal/custom-modal.component.ts`). Убедитесь, что он является `standalone` компонентом и наследует от `ModalBaseComponent`.
2.  Добавьте новый тип модального окна в `src/modal/ts/modal-type.enum.ts`.
3.  Свяжите новый тип с вашим компонентом в `src/modal/ts/modal-type.mapper.ts`:

    ```typescript
    import { CustomModalComponent } from '../../app/custom-modal/custom-modal.component'; // Укажите правильный путь

    export const modalTypeMapper: Record<ModalType, Type<ModalBaseComponent>> = {
      [ModalType.EXIT]: ModalExitComponent,
      [ModalType.CUSTOM_MODAL]: CustomModalComponent,
    };
    ```

Это основные шаги для начала работы с вашим `portal-service` в других проектах. Если у вас возникнут дополнительные вопросы, Егор, дайте мне знать! 