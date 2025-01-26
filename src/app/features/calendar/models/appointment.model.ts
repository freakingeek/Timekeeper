/**
 * Represents an appointment in the calendar
 * @interface Appointment
 * @property {string} id - Unique identifier for the appointment
 * @property {string} title - Title/description of the appointment
 * @property {Date} date - Date of the appointment
 */
export interface Appointment {
  id: string;
  title: string;
  date: Date;
}