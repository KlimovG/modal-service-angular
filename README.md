# PortalService

**PortalService** — это современное Angular-приложение, построенное на Angular 19.2.4, которое предоставляет мощный и гибкий сервис для управления модальными окнами (порталами). Проект демонстрирует использование новейших возможностей Angular, включая Signals, standalone компоненты и реактивное программирование.

## Основные возможности

- 🚀 **Современная архитектура**: Использует Angular Signals для реактивного управления состоянием
- 🎯 **Гибкость**: Поддержка как Angular компонентов, так и ng-template для содержимого модальных окон
- 📦 **Переиспользуемость**: Легко интегрируется в любой Angular проект
- ⚡ **Производительность**: Оптимизированное управление состоянием с минимальными перерисовками
- 🎨 **Настраиваемость**: Гибкие настройки анимации, оверлея и очереди модальных окон
- 🔄 **Очередь**: Поддержка последовательного отображения нескольких модальных окон

## Технологический стек

- **Angular** 19.2.4
- **TypeScript** (строгая типизация)
- **RxJS** для асинхронных операций
- **Angular Signals** для управления состоянием
- **Standalone Components** (без NgModules)

## Сервер разработки

Для запуска локального сервера разработки выполните:

```bash
ng serve
```

После запуска сервера откройте браузер и перейдите по адресу `http://localhost:4200/`. Приложение будет автоматически перезагружаться при изменении исходных файлов.

## Создание кода (Scaffolding)

Angular CLI включает мощные инструменты для генерации кода. Чтобы сгенерировать новый компонент, выполните:

```bash
ng generate component component-name
```

Для полного списка доступных схем (таких как `components`, `directives` или `pipes`) выполните:

```bash
ng generate --help
```

## Сборка проекта

Для сборки проекта выполните:

```bash
ng build
```

Эта команда скомпилирует ваш проект и сохранит артефакты сборки в директории `dist/`. По умолчанию, сборка для production оптимизирует ваше приложение для производительности и скорости.

## Сервис модальных окон (Modal Service)

В этом проекте реализован высокореактивный и переиспользуемый `ModalService` для управления модальными окнами (порталами). Он использует Angular Signals для эффективного управления состоянием и поддерживает открытие модальных окон как с помощью Angular компонентов, так и с использованием ссылок на `ng-template`.

### Использование

1.  **Импорт `ModalService` и `SmartModalContainerComponent`:**

    Убедитесь, что `SmartModalContainerComponent` импортирован в ваш `AppComponent` и размещен в `app.component.html`.

    ```typescript
    // src/app/app.component.ts
    import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
    import { SmartModalContainerComponent, ModalService } from "./modal";
    import { JsonPipe } from '@angular/common';

    @Component({
      selector: 'app-root',
      imports: [SmartModalContainerComponent, JsonPipe],
      templateUrl: './app.component.html',
      styleUrl: './app.component.scss'
    })
    export class AppComponent {
      private readonly modalService: ModalService = inject(ModalService);
      @ViewChild('myTemplate') myTemplate!: TemplateRef<any>;

      openModalWithComponent() {
        // Пример открытия модального окна с компонентом
        // this.modalService.openModal(YourModalComponent, true, { someData: 'value' });
      }

      openModalWithTemplate() {
        this.modalService.openModal(this.myTemplate, false, { name: 'Егор', id: 333 });
      }
    }
    ```

    ```html
    <!-- src/app/app.component.html -->
    <app-smart-modal-container></app-smart-modal-container>

    <button (click)="openModalWithTemplate()">Открыть модальное окно с шаблоном</button>

    <ng-template #myTemplate let-data="data">
      <h2>Данные для отладки в шаблоне: {{ data | json }}</h2>
      <h2>Привет, {{ data?.name }}!</h2>
      <p>Твой ID: {{ data?.id }}</p>
      @if (!data) {
        <h2>Данные отсутствуют или не определены в шаблоне.</h2>
      }
    </ng-template>
    ```

2.  **Открытие модального окна:**

    *   **С компонентом:**
        ```typescript
        import { YourModalComponent } from './путь/к/your-modal.component';

        // ... внутри вашего компонента или сервиса
        this.modalService.openModal(YourModalComponent, true, { некоторыйКлюч: 'некотороеЗначение' });
        ```

    *   **С `ng-template`:**
        Сначала определите ваш `ng-template` в шаблоне компонента:

        ```html
        <ng-template #myTemplate let-data="data">
            <h3>Привет, {{ data?.name }}!</h3>
            <p>Твой ID: {{ data?.id }}</p>
        </ng-template>
        ```
        Затем получите ссылку на него в классе компонента и откройте модальное окно:
        ```typescript
        import { ViewChild, TemplateRef } from '@angular/core';

        // ... внутри класса вашего компонента
        @ViewChild('myTemplate') myTemplate!: TemplateRef<any>;

        openTemplateModal() {
            this.modalService.openModal(this.myTemplate, false, { name: 'Алиса', id: 123 });
        }
        ```

3.  **Закрытие модального окна:**
    Чтобы закрыть текущее активное модальное окно:
    ```typescript
    this.modalService.closeModal();
    ```

4.  **Переключение модальных окон (Закрыть, затем Открыть):**
    Чтобы закрыть текущее модальное окно и немедленно открыть новое:
    ```typescript
    this.modalService.toggleModal(NewModalComponent, true, { сообщение: 'Переключено!' });
    ```

5.  **Закрытие модального окна и навигация:**
    Чтобы закрыть текущее модальное окно, а затем перейти по новому маршруту:
    ```typescript
    this.modalService.closeAndNavigate('/новый-маршрут');
    ```

### Ключевые особенности

*   **Управление состоянием на основе сигналов**: Использует Angular Signals для эффективного и реактивного управления состоянием модальных окон.
*   **Поддержка компонентов и шаблонов**: Гибкое открытие модальных окон с помощью автономного Angular компонента или ссылки на `ng-template`.
*   **Передача данных**: Легкая передача данных в ваши модальные компоненты или шаблоны.
*   **Управление анимацией**: Настраиваемая скорость анимации закрытия через `modalService.animationSpeed`.
*   **Очередь модальных окон**: Поддерживает постановку нескольких модальных окон в очередь, показывая их последовательно.
*   **Управление оверлеем**: Опция для отображения полупрозрачного оверлея за модальным окном.

## Структура проекта

```
src/
├── app/                    # Основное приложение
│   ├── app.component.*     # Корневой компонент
│   ├── app.config.ts       # Конфигурация приложения
│   └── app.routes.ts       # Маршруты приложения
└── modal/                  # Модуль модальных окон
    ├── components/         # Компоненты модальных окон
    │   ├── modal-container/          # Контейнер модального окна
    │   └── smart-modal-container/    # Умный контейнер с логикой
    ├── service/           # Сервисы
    │   └── modal.service.ts         # Основной сервис модальных окон
    ├── ts/                # TypeScript типы и интерфейсы
    └── index.ts           # Точка экспорта модуля
```

## Дополнительные ресурсы

Для получения дополнительной информации по использованию Angular CLI, включая подробные справочные данные по командам, посетите страницу [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
