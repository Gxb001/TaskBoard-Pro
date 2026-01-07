import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-container">
      @for (notification of notifications$ | async; track notification.id) {
        <div class="notification" [class]="notification.type" (click)="dismiss(notification.id)">
          <span class="notification-icon">
            @switch (notification.type) {
              @case ('success') { OK }
              @case ('error') { X }
              @case ('warning') { ! }
              @default { i }
            }
          </span>
          <span class="notification-message">{{ notification.message }}</span>
          <button class="notification-close">x</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .notifications-container {
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 1001;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 350px;
    }
    .notification {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      animation: slideIn 0.3s ease;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .notification.success { background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%); color: white; }
    .notification.error { background: linear-gradient(135deg, #f44336 0%, #c62828 100%); color: white; }
    .notification.warning { background: linear-gradient(135deg, #ff9800 0%, #ef6c00 100%); color: white; }
    .notification.info { background: linear-gradient(135deg, #2196f3 0%, #1565c0 100%); color: white; }
    .notification-icon { font-size: 1.2rem; font-weight: bold; }
    .notification-message { flex: 1; font-size: 0.95rem; font-weight: 500; }
    .notification-close { background: none; border: none; color: rgba(255, 255, 255, 0.8); font-size: 1rem; cursor: pointer; }
  `]
})
export class NotificationsComponent {
  private notificationService = inject(NotificationService);
  notifications$ = this.notificationService.notifications$;
  dismiss(id: number): void {
    this.notificationService.dismiss(id);
  }
}