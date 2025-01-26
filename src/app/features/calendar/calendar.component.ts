import { Subject, takeUntil } from "rxjs";
import { CommonModule } from "@angular/common";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Appointment } from "./models/appointment.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppointmentService } from "./services/appointment.service";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { CalendarGridComponent } from "./components/calendar-grid/calendar-grid.component";
import { AppointmentDialogComponent } from "./components/appointment-dialog/appointment-dialog.component";

@Component({
  selector: "app-calendar",
  imports: [CommonModule, MatDialogModule, CalendarGridComponent],
  templateUrl: "./calendar.component.html",
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendarDates: Date[] = [];
  appointments: Appointment[] = [];
  dropListIds: string[] = [];
  weekDays: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  private destroy$ = new Subject<void>();

  constructor(private dialog: MatDialog, private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.generateCalendarDates();
    this.initializeDropListIds();
    this.subscribeToAppointments();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private generateCalendarDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());

    this.calendarDates = Array.from({ length: 28 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  }

  private initializeDropListIds() {
    this.dropListIds = this.calendarDates.map((date) => date.toISOString());
  }

  private subscribeToAppointments() {
    this.appointmentService
      .getAppointments()
      .pipe(takeUntil(this.destroy$))
      .subscribe((appointments) => {
        this.appointments = appointments;
      });
  }

  openAppointmentDialog(date: Date) {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: "500px",
      panelClass: "appointment-dialog",
    });

    dialogRef.componentInstance.form.patchValue({ date });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.appointmentService.addAppointment({
        id: Date.now().toString(),
        title: result.title,
        date: result.date,
      });
    });
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentService.deleteAppointment(appointment.id);
  }

  onAppointmentDrop(event: CdkDragDrop<Appointment[]>) {
    if (event.previousContainer === event.container) {
      return;
    }

    const appointment = event.item.data;
    const newDate = new Date(event.container.id);
    this.appointmentService.updateAppointmentDate(appointment.id, newDate);
  }
}
