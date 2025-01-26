import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { Appointment } from "../models/appointment.model";

const STORAGE_KEY = "appointments";

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  private appointments = new BehaviorSubject<Appointment[]>(this.loadAppointments());

  constructor() {
    this.appointments.subscribe((appointments) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    });
  }

  private loadAppointments(): Appointment[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    try {
      const appointments = JSON.parse(stored);
      return appointments.map((app: Appointment) => ({
        ...app,
        date: new Date(app.date),
      }));
    } catch (error) {
      console.error("Error loading appointments:", error);
      return [];
    }
  }

  getAppointments() {
    return this.appointments.asObservable();
  }

  addAppointment(appointment: Appointment) {
    const current = this.appointments.value;
    this.appointments.next([...current, appointment]);
  }

  deleteAppointment(id: string) {
    const current = this.appointments.value;
    this.appointments.next(current.filter((app) => app.id !== id));
  }

  updateAppointmentDate(id: string, newDate: Date) {
    const current = this.appointments.value;
    const updated = current.map((app) => (app.id === id ? { ...app, date: newDate } : app));
    this.appointments.next(updated);
  }
}
