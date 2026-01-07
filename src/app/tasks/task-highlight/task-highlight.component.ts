import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
@Component({
  selector: 'app-task-highlight',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="highlight-overlay" (click)="close.emit()">
      <div class="highlight-card" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="close.emit()">X</button>
        <div class="highlight-header">
          <span class="highlight-icon">STAR</span>
          <h2>Tache mise en avant</h2>
        </div>
        <div class="highlight-content">
          <h3>{{ task?.title }}</h3>
          <p>{{ task?.description || 'Aucune description' }}</p>
          <div class="task-meta">
            <span class="priority-badge" [class]="task?.priority">{{ task?.priority }}</span>
            <span class="status-badge" [class.completed]="task?.completed">
              {{ task?.completed ? 'Terminee' : 'En cours' }}
            </span>
          </div>
          <p class="task-date">Creee le {{ task?.createdAt | date:'dd/MM/yyyy' }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .highlight-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .highlight-card { background: white; border-radius: 16px; padding: 2rem; max-width: 500px; width: 90%; position: relative; }
    .close-btn { position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; }
    .highlight-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; border-bottom: 2px solid #f0f0f0; padding-bottom: 1rem; }
    .highlight-icon { font-size: 1.5rem; }
    .highlight-content { text-align: center; }
    .highlight-content h3 { font-size: 1.5rem; margin: 0 0 0.75rem; }
    .highlight-content p { color: #666; margin: 0 0 1rem; }
    .task-meta { display: flex; justify-content: center; gap: 1rem; margin-bottom: 1rem; }
    .priority-badge { padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; background: #e0e0e0; }
    .priority-badge.high { background: #ffebee; color: #f44336; }
    .priority-badge.medium { background: #fff3e0; color: #ff9800; }
    .priority-badge.low { background: #e8f5e9; color: #4caf50; }
    .status-badge { padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem; background: #fff3e0; color: #ff9800; }
    .status-badge.completed { background: #e8f5e9; color: #4caf50; }
    .task-date { color: #999; font-size: 0.85rem; }
  `]
})
export class TaskHighlightComponent {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();
}