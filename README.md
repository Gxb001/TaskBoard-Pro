# TaskBoardPro

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Séquence 3 — Lazy Loading & Composants dynamiques

### 🚀 Qu'est-ce que le Lazy Loading ?

Le **Lazy Loading** (chargement paresseux) est une technique d'optimisation qui consiste à charger les modules/composants uniquement quand l'utilisateur en a besoin, plutôt que de tout charger au démarrage de l'application.

**Avantages :**
- ⚡ Temps de chargement initial réduit
- 📦 Bundles JavaScript séparés par feature
- 🎯 Meilleure expérience utilisateur

**Implémentation avec `loadChildren()` :**
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.routes').then(m => m.TASKS_ROUTES)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.routes').then(m => m.ABOUT_ROUTES)
  }
];
```

### 📁 Comment structurer une app avec features/

```
src/app/
├── core/                    # Services globaux (singleton)
│   └── services/
│       └── notification.service.ts
├── shared/                  # Composants réutilisables
│   └── notifications/
├── home/                    # Feature Home
│   ├── home.ts
│   ├── home.html
│   ├── home.css
│   └── home.routes.ts       # Routes de la feature
├── tasks/                   # Feature Tasks
│   ├── tasks.ts
│   ├── tasks.html
│   ├── tasks.css
│   ├── tasks.routes.ts
│   ├── task-highlight/      # Composant dynamique
│   └── task-edit/           # Composant dynamique
├── about/                   # Feature About
│   └── ...
└── app.routes.ts            # Routes principales
```

### 🔄 Qu'est-ce qu'un composant dynamique ?

Un **composant dynamique** est un composant qui n'est pas déclaré dans le template HTML, mais créé programmatiquement à l'exécution (runtime). Cela permet de :

- Afficher des modales/popups à la demande
- Créer des interfaces configurables
- Charger des composants selon des conditions

**Exemples dans ce projet :**
- `TaskHighlightComponent` : Affiche une tâche mise en avant
- `TaskEditComponent` : Formulaire d'édition de tâche

### 🛠️ Comment fonctionne ViewContainerRef + createComponent()

**ViewContainerRef** est une référence à un conteneur dans le DOM où on peut injecter des composants dynamiquement.

```typescript
// 1. Déclarer le conteneur dans le template
<ng-container #dynamicComponentContainer></ng-container>

// 2. Récupérer la référence avec @ViewChild
@ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) 
dynamicContainer!: ViewContainerRef;

// 3. Créer le composant dynamiquement
highlightTask(task: Task): void {
  // Nettoyer le conteneur
  this.dynamicContainer.clear();
  
  // Créer le composant
  const componentRef = this.dynamicContainer.createComponent(TaskHighlightComponent);
  
  // Passer des données au composant
  componentRef.instance.task = task;
  
  // S'abonner aux événements
  componentRef.instance.close.subscribe(() => {
    componentRef.destroy();
  });
}
```

**Cycle de vie :**
1. `createComponent()` instancie le composant
2. Les `@Input()` sont assignés via `.instance`
3. Les `@Output()` sont écoutés via `.subscribe()`
4. `destroy()` supprime le composant

### 📢 Notifications avec tap()

L'opérateur `tap()` de RxJS permet d'observer un flux **sans le modifier**. Idéal pour :
- Logger des actions
- Déclencher des effets secondaires
- Afficher des notifications

```typescript
// Dans TaskService
addTask(task): void {
  // ... logique d'ajout ...
  
  // Observer avec tap() sans modifier le flux
  this.tasks$.pipe(
    tap(() => console.log('[TaskService] Tâche ajoutée'))
  ).subscribe().unsubscribe();
  
  // Afficher notification
  this.notificationService.success('Tâche ajoutée !');
}
```

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

## Routing

This project includes a basic routing setup. You can define routes in the `app-routing.module.ts` file located in the `src/app/` directory.

``
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', redirectTo: ''}
];
``
