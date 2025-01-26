import { CommonModule } from "@angular/common";
import { Appointment } from "../../models/appointment.model";
import { DragDropModule, CdkDragDrop } from "@angular/cdk/drag-drop";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CalendarDayComponent } from "../calendar-day/calendar-day.component";

@Component({
  selector: "app-calendar-grid",
  imports: [CommonModule, DragDropModule, CalendarDayComponent],
  templateUrl: "./calendar-grid.component.html",
  styleUrl: "./calendar-grid.component.scss",
})
export class CalendarGridComponent {
  @Input() calendarDates: Date[] = [];
  @Input() appointments: Appointment[] = [];
  @Input() dropListIds: string[] = [];
  @Input() weekDays: string[] = [];

  @Output() appointmentDeleted = new EventEmitter<Appointment>();
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() appointmentDropped = new EventEmitter<CdkDragDrop<Appointment[]>>();

  getAppointmentsForDate(date: Date) {
    return this.appointments.filter((app) => this.isSameDay(new Date(app.date), date));
  }

  private isSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
