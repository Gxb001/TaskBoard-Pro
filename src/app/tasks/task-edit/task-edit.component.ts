import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="edit-overlay" (click)="cancel.emit()">
      <div class="edit-card" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="cancel.emit()">X</button>
        <div class="edit-header">
          <span>EDIT</span>
          <h2>Modifier la tache</h2>
        </div>
        <form class="edit-form" (ngSubmit)="onSave()">
          <div class="form-group">
            <label for="title">Titre</label>
            <input id="title" type="text" [(ngModel)]="editedTitle" name="title" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" [(ngModel)]="editedDescription" name="description" class="form-input" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="priority">Priorite</label>
            <select id="priority" [(ngModel)]="editedPriority" name="priority" class="form-input">
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-cancel" (click)="cancel.emit()">Annuler</button>
            <button type="submit" class="btn-save">Sauvegarder</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .edit-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .edit-card { background: white; border-radius: 16px; padding: 2rem; max-width: 500px; width: 90%; position: relative; }
    .close-btn { position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; }
    .edit-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; border-bottom: 2px solid #f0f0f0; padding-bottom: 1rem; }
    .form-group { margin-bottom: 1.25rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; }
    .form-input { width: 100%; padding: 0.75rem 1rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem; box-sizing: border-box; }
    .form-input:focus { outline: none; border-color: #667eea; }
    textarea.form-input { resize: vertical; min-height: 80px; }
    .form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .btn-cancel, .btn-save { flex: 1; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; }
    .btn-cancel { background: #f5f5f5; border: 2px solid #e0e0e0; color: #666; }
    .btn-save { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; color: white; }
  `]
})
export class TaskEditComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<Partial<Task>>();
  @Output() cancel = new EventEmitter<void>();
  editedTitle = '';
  editedDescription = '';
  editedPriority: 'low' | 'medium' | 'high' = 'medium';
  ngOnInit(): void {
    if (this.task) {
      this.editedTitle = this.task.title;
      this.editedDescription = this.task.description;
      this.editedPriority = this.task.priority;
    }
  }
  onSave(): void {
    if (this.editedTitle.trim()) {
      this.save.emit({
        title: this.editedTitle.trim(),
        description: this.editedDescription.trim(),
        priority: this.editedPriority
      });
    }
  }
}