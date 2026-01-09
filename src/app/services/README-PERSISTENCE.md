# Persistance des donnees - TaskBoard Pro

## Description

Le service `TaskService` stocke les taches dans le localStorage du navigateur au format JSON.

## Modele de donnees

Chaque tache suit le modele `Task` :

```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}
```

## Stockage

- Cle de stockage : `taskboard-pro-tasks`
- Format : JSON
- Emplacement : localStorage du navigateur

## Fonctionnement

1. Au demarrage, le service charge les taches depuis le localStorage
2. Si aucune donnee n'existe, les taches par defaut sont utilisees
3. A chaque modification (ajout, suppression, mise a jour), les donnees sont sauvegardees automatiquement

## Interface utilisateur

Trois boutons sont disponibles dans la page des taches :

| Bouton        | Action                                                                |
|---------------|-----------------------------------------------------------------------|
| Reinitialiser | Supprime toutes les taches et restaure les valeurs par defaut         |
| Exporter JSON | Telecharge un fichier `tasks-export.json` contenant toutes les taches |
| Importer JSON | Permet de charger un fichier JSON pour remplacer les taches actuelles |

## Methodes du service

| Methode                  | Description                                    |
|--------------------------|------------------------------------------------|
| `loadTasksFromStorage()` | Charge les taches depuis le localStorage       |
| `saveTasksToStorage()`   | Sauvegarde les taches dans le localStorage     |
| `resetToDefaultTasks()`  | Reinitialise les taches aux valeurs par defaut |
| `exportTasksToJson()`    | Exporte les taches en chaine JSON              |
| `importTasksFromJson()`  | Importe des taches depuis une chaine JSON      |

## Structure JSON

Exemple de donnees stockees :

```json
[
  {
    "id": 1,
    "title": "Apprendre Angular",
    "description": "Maitriser les concepts fondamentaux",
    "completed": false,
    "priority": "high",
    "createdAt": "2026-01-09T10:00:00.000Z"
  }
]
```

## Limites

- Stockage limite a environ 5 Mo (limite du localStorage)
- Donnees locales au navigateur
- Pas de synchronisation entre appareils

