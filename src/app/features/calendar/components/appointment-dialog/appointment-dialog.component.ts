import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-appointment-dialog",
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: "./appointment-dialog.component.html",
  styleUrl: "./appointment-dialog.component.scss",
})
export class AppointmentDialogComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AppointmentDialogComponent>) {
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(100)]],
      date: [null, Validators.required],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }
}
