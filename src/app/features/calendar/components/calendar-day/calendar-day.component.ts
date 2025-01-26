import { CommonModule } from "@angular/common";
import { Appointment } from "../../models/appointment.model";
import { DragDropModule, CdkDragDrop } from "@angular/cdk/drag-drop";
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-calendar-day",
  imports: [CommonModule, DragDropModule],
  templateUrl: "./calendar-day.component.html",
  styleUrl: "./calendar-day.component.scss",
})
export class CalendarDayComponent {
  @Input() date!: Date;
  @Input() appointments: Appointment[] = [];
  @Input() dropListIds: string[] = [];

  @Output() appointmentDeleted = new EventEmitter<Appointment>();
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() appointmentDropped = new EventEmitter<CdkDragDrop<Appointment[]>>();

  get isToday() {
    const today = new Date();
    return this.isSameDay(this.date, today);
  }

  get isFirstOfMonth() {
    return this.date.getDate() === 1;
  }

  onDeleteAppointment(appointment: Appointment, event: MouseEvent) {
    event.stopPropagation();
    this.appointmentDeleted.emit(appointment);
  }

  onDrop(event: CdkDragDrop<Appointment[]>) {
    this.appointmentDropped.emit(event);
  }

  private isSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
