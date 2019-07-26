import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  setInputDefaults,
  textSelectEventHandler,
  textInputEventHandler
} from '../../../assets/ts/text-input-control';
import Doctor from '../models/doctor.model';
import Procedure from '../models/procedure.model';
import {DoctorService} from '../services/doctor/doctor.service';
import {ProcedureService} from '../services/procedure/procedure.service';
import {AppointmentService} from '../services/appointment/appointment.service';
import Appointment from '../models/appointment.model';
import * as $ from 'jquery';

const toSpaceBetween = (s: string): string => {
  return s.replace(/[A-Z]/g, (c: string) => ` ${c.toLowerCase()}`);
};

const toSnakeCase = (s: string): string => {
  return s.replace(/[A-Z]/g, (c: string): string => `_${c.toLowerCase()}`);
};

@Component({
  selector: 'app-log-in',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit, DoCheck {
  form: FormGroup;

  doctors: Doctor[];
  doctorsClone: Doctor[];
  procedures: Procedure[];
  proceduresClone: Procedure[];

  doctorsNames: string[];
  proceduresNames: string[];

  appointmentFieldAvailable: boolean;
  doctorAvailable = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private procedureService: ProcedureService,
    private appointmentService: AppointmentService,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.email],
      fullName: ['', Validators.pattern(/\w+ \w+/)],
      phoneNumber: [''],
      doctor: [''],
      procedure: [''],
      appointmentTimestamp: ['']
    }, {
      validators: Validators.required
    });

    this.doctorService.findAll()
      .subscribe((data: Doctor[]) => {
        this.doctors = data;
        this.doctorsClone = data;

        document.getElementById('doctor').removeAttribute('disabled');
      });

    this.procedureService.findAll()
      .subscribe((data: Procedure[]) => {
        this.procedures = data;
        this.proceduresClone = data;

        document.getElementById('procedure').removeAttribute('disabled');
      });
  }

  ngOnInit() {
    document.title = 'Appointment Form';

    // input animations
    document.querySelectorAll('.text-input-control input')
      .forEach((textInput) => {
        textInput.addEventListener('focus', textInputEventHandler('focus'));
        textInput.addEventListener('blur', textInputEventHandler('blur'));

        setInputDefaults(textInput);
      });

    document.querySelectorAll('.text-select-control .main-input')
      .forEach((textSelect) => {
        textSelect.addEventListener('focus', textSelectEventHandler('focus'));
        textSelect.addEventListener('blur', textSelectEventHandler('blur'));

        setInputDefaults(textSelect);
      });
  }

  ngDoCheck() {
    if (document.getElementById('appointmentTimestamp')) {
      if (!this.appointmentFieldAvailable) {
        this.appointmentFieldAvailable = true;

        const appointmentInput = document.querySelector('#appointmentTimestamp');

        appointmentInput.addEventListener('focus', textInputEventHandler('focus'));
        appointmentInput.addEventListener('blur', textInputEventHandler('blur'));

        setInputDefaults(appointmentInput);
      }
    } else {
      if (this.appointmentFieldAvailable) {
        this.appointmentFieldAvailable = false;
      }
    }
  }

  validate() {
    const form = document.querySelector('form');

    this.form.controls.phoneNumber.setValue(this.form.controls.phoneNumber.value.replace(/[^0-9]*/g, ''));

    if (form.classList.contains('validated')) {
      const controls = this.form.controls;

      Object.keys(controls).forEach((field) => {
        if (document.getElementById('appointmentTimestamp') || field !== 'appointmentTimestamp') {
          if (field === 'fullName') {
            console.log(controls[field]);
          }

          const input = document.getElementById(field);
          const labelSpan = document
            .querySelector(`label[for="${field}"] > .feedback`);

          input.classList[controls[field].errors ? 'add' : 'remove']('invalid');
          let labelContent = '';

          if (controls[field].errors) {
            Object.keys(controls[field].errors).forEach((error) => {
              switch (error) {
                case 'required':
                  labelContent = 'Please, enter this field';

                  break;
                case 'email':
                  labelContent = 'Please, enter a valid email';

                  break;
                case 'pattern':
                  labelContent = `Please, enter a valid ${toSpaceBetween(field)}`;

                  break;
                default:
                  labelContent = '';

                  break;
              }
            });
          }

          labelSpan.textContent = labelContent;
        }
      });
    }
  }

  autocompleteInputField(event: any) {
    const inputId = event.target.getAttribute('id');
    const control = this.form.get(inputId);
    const entityType = inputId === 'procedure'
      ? 'procedures'
      : 'doctors';

    const autocompleteInput = document.querySelector(`#${inputId} + .autocomplete-input`);

    switch (event.code) {
      case 'ArrowUp':
      case 'ArrowDown':
        const nextValueIndex = this[`${entityType}Names`]
          .indexOf(autocompleteInput.getAttribute('value')) + (event.code === 'ArrowUp' ? -1 : 1);

        if (this[`${entityType}Names`][nextValueIndex]) {
          autocompleteInput
            .setAttribute('value', this[`${entityType}Names`][nextValueIndex]);
        }

        break;
      case 'ArrowRight':
      case 'Enter':
        const otherEntityType = entityType === 'doctors' ? 'procedures' : 'doctors';

        if (this[`${entityType}Names`]) {
          this.completeField(event);

          const entityIndex = entityType === 'doctors'
            ? this.doctors.map((entity) => entity.name)
              .indexOf(autocompleteInput.getAttribute('value'))
            : this.procedures.map((procedure) => procedure.name)
              .indexOf(autocompleteInput.getAttribute('value'));

          this[`${otherEntityType}Clone`] = this[entityType][entityIndex][otherEntityType];
        } else {
          this[`${otherEntityType}Clone`] = this[otherEntityType];
        }

        break;
      default:
        this[`${entityType}Names`] = this.getNames(entityType, control.value);

        autocompleteInput.setAttribute(
          'value',
          this[`${entityType}Names`].length ? this[`${entityType}Names`][0] : ''
        );

        this.validate();

        break;
    }
  }

  completeField(event: any) {
    const inputId = event.target.getAttribute('id');
    const entityType = inputId === 'procedure'
      ? 'procedures'
      : 'doctors';

    const control = this.form.get(inputId);
    const autocompleteInput = event.target.nextElementSibling;

    if (event.type !== 'blur' || control.value) {
      event.target.value = autocompleteInput.getAttribute('value');

      this[`${entityType}Names`] = [event.target.value];
      control.setValue(event.target.value);
    } else {
      const otherEntityType = entityType === 'doctors' ? 'procedures' : 'doctors';

      this[`${entityType}Clones`] = this[entityType];
      this[`${otherEntityType}Clone`] = this[otherEntityType];
    }
  }

  private getNames(entityType: string, inputValue: string) {
    return this[`${entityType}Clone`]
      .map((entity) => entity.name)
      .filter((name) => name.startsWith(inputValue))
      .sort();
  }

  isDoctorAvailable() {
    const doctorIndex = this.doctors
      .map((doctor) => doctor.name)
      .indexOf(this.form.get('doctor').value);

    if (doctorIndex > -1 && this.form.get('appointmentTimestamp').value) {
      this.appointmentService
        .isDoctorAvailable(this.doctors[doctorIndex].id, this.form.get('appointmentTimestamp').value)
        .subscribe((data: { available: boolean }) => {
          if (data.available) {
            if (!$('.alert-danger.alert-div').attr('hidden')) {
              $('.alert-danger.alert-div').attr('hidden', 'hidden');
            }

            if ($('.alert-success.alert-div').attr('hidden')) {
              $('.alert-success.alert-div').removeAttr('hidden');
            }

            this.doctorAvailable = true;
          } else {
            if (!$('.alert-success.alert-div').attr('hidden')) {
              $('.alert-success.alert-div').attr('hidden', 'hidden');
            }

            if ($('.alert-danger.alert-div').attr('hidden')) {
              $('.alert-danger.alert-div').removeAttr('hidden');
            }

            this.doctorAvailable = false;
          }
        });
    }
  }

  submit() {
    if (this.form.invalid) {
      const form = document.querySelector('form');

      if (!form.classList.contains('validated')) {
        form.classList.add('validated');
      }

      this.validate();
    } else if (this.doctorAvailable) {
      const formData: FormData = new FormData();

      Object.keys(this.form.controls).forEach((controlName) => {
        if (controlName !== 'doctor' && controlName !== 'procedure') {
          formData.append(toSnakeCase(controlName), this.form.get(controlName).value);
        }
      });

      const doctorIndex = this.doctors
        .map((doctor) => doctor.name)
        .indexOf(this.form.get('doctor').value);

      formData.append('doctor_id', this.doctors[doctorIndex].id.toString());

      const procedureIndex = this.procedures
        .map((procedure) => procedure.name)
        .indexOf(this.form.get('procedure').value);

      formData.append('procedure_id', this.procedures[procedureIndex].id.toString());

      this.appointmentService.add(formData)
        .subscribe((data: Appointment) => {
          if (data) {
            const successDiv = document.querySelector('.info-div.success');

            successDiv.classList.add('active');

            setTimeout(() => {
              successDiv.classList.remove('active');
            }, 3500);
          } else {
            const errorDiv = document.querySelector('.info-div.error');

            errorDiv.classList.add('active');

            setTimeout(() => {
              errorDiv.classList.remove('active');
            }, 3500);
          }
        });
    }
  }
}
