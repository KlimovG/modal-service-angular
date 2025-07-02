# PortalService

**PortalService** — это современное Angular-приложение, построенное на Angular 19.2.4, которое предоставляет мощный и гибкий сервис для управления модальными окнами (порталами). Проект демонстрирует использование новейших возможностей Angular, включая Signals, standalone компоненты и реактивное программирование.

## Основные возможности

- 🚀 **Современная архитектура**: Использует Angular Signals для реактивного управления состоянием
- 🎯 **Гибкость**: Поддержка как Angular компонентов, так и ng-template для содержимого порталов
- 📦 **Переиспользуемость**: Легко интегрируется в любой Angular проект
- ⚡ **Производительность**: Оптимизированное управление состоянием с минимальными перерисовками
- 🎨 **Настраиваемость**: Гибкие настройки анимации, оверлея и очереди порталов
- 🔄 **Очередь**: Поддержка последовательного отображения нескольких порталов

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

## Сервис порталов (Portal Service)

В этом проекте реализован высокореактивный и переиспользуемый `PortalService` для управления порталами (модальными окнами). Он использует Angular Signals для эффективного управления состоянием и поддерживает открытие порталов как с помощью Angular компонентов, так и с использованием ссылок на `ng-template`.

### Использование

1.  **Импорт `PortalService` и `SmartPortalContainerComponent`:**

    Убедитесь, что `SmartPortalContainerComponent` импортирован в ваш `AppComponent` и размещен в `app.component.html`.

    ```typescript
    // src/app/app.component.ts
    import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
    import { SmartPortalContainerComponent, PortalService } from "./portal";
    import { JsonPipe } from '@angular/common';

    @Component({
      selector: 'app-root',
      imports: [SmartPortalContainerComponent, JsonPipe],
      templateUrl: './app.component.html',
      styleUrl: './app.component.scss'
    })
    export class AppComponent {
      private readonly portalService: PortalService = inject(PortalService);
      @ViewChild('myTemplate') myTemplate!: TemplateRef<any>;

      openPortalWithComponent() {
        // Пример открытия портала с компонентом
        // this.portalService.openPortal(YourPortalComponent, true, { someData: 'value' });
      }

      openPortalWithTemplate() {
        this.portalService.openPortal(this.myTemplate, false, { name: 'Егор', id: 333 });
      }
    }
    ```

    ```html
    <!-- src/app/app.component.html -->
    <app-smart-portal-container></app-smart-portal-container>

    <button (click)="openPortalWithTemplate()">Открыть портал с шаблоном</button>

    <ng-template #myTemplate let-data="data">
      <h2>Данные для отладки в шаблоне: {{ data | json }}</h2>
      <h2>Привет, {{ data?.name }}!</h2>
      <p>Твой ID: {{ data?.id }}</p>
      @if (!data) {
        <h2>Данные отсутствуют или не определены в шаблоне.</h2>
      }
    </ng-template>
    ```

2.  **Открытие портала:**

    *   **С компонентом:**
        ```typescript
        import { YourPortalComponent } from './путь/к/your-portal.component';

        // ... внутри вашего компонента или сервиса
        this.portalService.openPortal(YourPortalComponent, true, { некоторыйКлюч: 'некотороеЗначение' });
        ```

    *   **С `ng-template`:**
        Сначала определите ваш `ng-template` в шаблоне компонента:

        ```html
        <ng-template #myTemplate let-data="data">
            <h3>Привет, {{ data?.name }}!</h3>
            <p>Твой ID: {{ data?.id }}</p>
        </ng-template>
        ```
        Затем получите ссылку на него в классе компонента и откройте портал:
        ```typescript
        import { ViewChild, TemplateRef } from '@angular/core';

        // ... внутри класса вашего компонента
        @ViewChild('myTemplate') myTemplate!: TemplateRef<any>;

        openTemplatePortal() {
            this.portalService.openPortal(this.myTemplate, false, { name: 'Алиса', id: 123 });
        }
        ```

3.  **Закрытие портала:**
    Чтобы закрыть текущий активный портал:
    ```typescript
    this.portalService.closePortal();
    ```

4.  **Переключение порталов (Закрыть, затем Открыть):**
    Чтобы закрыть текущий портал и немедленно открыть новый:
    ```typescript
    this.portalService.togglePortal(NewPortalComponent, true, { сообщение: 'Переключено!' });
    ```

5.  **Закрытие портала и навигация:**
    Чтобы закрыть текущий портал, а затем перейти по новому маршруту:
    ```typescript
    this.portalService.closeAndNavigate('/новый-маршрут');
    ```

### Ключевые особенности

*   **Управление состоянием на основе сигналов**: Использует Angular Signals для эффективного и реактивного управления состоянием порталов.
*   **Поддержка компонентов и шаблонов**: Гибкое открытие порталов с помощью автономного Angular компонента или ссылки на `ng-template`.
*   **Передача данных**: Легкая передача данных в ваши компоненты порталов или шаблоны.
*   **Управление анимацией**: Настраиваемая скорость анимации закрытия через `portalService.animationSpeed`.
*   **Очередь порталов**: Поддерживает постановку нескольких порталов в очередь, показывая их последовательно.
*   **Управление оверлеем**: Опция для отображения полупрозрачного оверлея за порталом.

## Структура проекта

```
src/
├── app/                    # Основное приложение
│   ├── app.component.*     # Корневой компонент
│   ├── app.config.ts       # Конфигурация приложения
│   └── app.routes.ts       # Маршруты приложения
└── portal/                 # Модуль порталов
    ├── components/         # Компоненты порталов
    ├── core-components/    # Основные компоненты
    │   ├── portal-container/         # Контейнер портала
    │   └── smart-portal-container/   # Умный контейнер с логикой
    ├── service/           # Сервисы
    │   └── portal.service.ts        # Основной сервис порталов (PortalService)
    ├── ts/                # TypeScript типы и интерфейсы
    └── index.ts           # Точка экспорта модуля
```

## Дополнительные ресурсы

Для получения дополнительной информации по использованию Angular CLI, включая подробные справочные данные по командам, посетите страницу [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
