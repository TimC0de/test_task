import {Component, OnInit} from '@angular/core';
import AppointmentService from './services/appointment';
import Appointment from './models/appointment.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  setInputDefaults,
  textInputEventHandler,
  textSelectEventHandler
} from '../../assets/ts/text-input-control';

const toSnakeCase = (s: string): string => {
  return s.replace(/[A-Z]/g, (c: string): string => `_${c.toLowerCase()}`);
};

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  filterForm: FormGroup;
  itemsCount: FormControl = new FormControl(
    5,
    [
      Validators.required,
      Validators.min(5),
      Validators.max(20),
    ]);

  countChanged = false;

  appointments: Appointment[] = [];
  appointmentsCount: number;
  appointmentTimestampErrors = false;
  filtered = false;

  constructor(
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    document.title = 'Appointments';

    this.filterForm = this.fb.group({
      fullName: [''],
      email: [''],
      phoneNumber: [''],
      maxAppointmentTimestamp: [''],
      minAppointmentTimestamp: [''],
      sort: ['']
    });

    this.findAppointments(1);

    document
      .querySelectorAll('.text-input-control input')
      .forEach((textInput) => {
        textInput.addEventListener('focus', textInputEventHandler('focus'));
        textInput.addEventListener('blur', textInputEventHandler('blur'));

        setInputDefaults(textInput);
      });

    document.querySelectorAll('.text-select-control .main-input')
      .forEach((textSelect) => {
        textSelect.addEventListener(
          'focus',
          textSelectEventHandler('focus'));

        textSelect.addEventListener(
          'blur',
          textSelectEventHandler('blur'));

        setInputDefaults(textSelect);
      });
  }

  formatDate(date: Date) {
    date = new Date(date);

    const month = date.getMonth() + 1 > 9
      ? date.getMonth() + 1
      : `0${date.getMonth() + 1}`;

    const day = date.getDate() > 9
      ? date.getDate()
      : `0${date.getDate()}`;

    const hours = date.getHours() > 9
      ? date.getHours()
      : `0${date.getHours()}`;

    const minutes = date.getMinutes() > 9
      ? date.getMinutes()
      : `0${date.getMinutes()}`;

    const seconds = date.getSeconds() > 9
      ? date.getSeconds()
      : `0${date.getSeconds()}`;

    return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  validate() {
    const input = document.getElementById('itemsCount');
    const labelSpan = document.querySelector('label[for="itemsCount"] > .feedback');

    input.classList[this.itemsCount.errors ? 'add' : 'remove']('invalid');
    let textContent = '';

    if (this.itemsCount.errors) {
      Object.keys(this.itemsCount.errors).forEach((error) => {
        switch (error) {
          case 'required':
            textContent = 'Please, enter this field';

            break;
          case 'min':
            textContent = 'Please, enter higher number';

            break;
          case 'max':
            textContent = 'Please, enter lower number';

            break;
          default:
            textContent = '';

            break;
        }
      });
    }

    labelSpan.textContent = textContent;

    this.countChanged = true;
  }

  validateFilter() {
    if (
      (
        this.filterForm.get('maxAppointmentTimestamp').value &&
        !this.filterForm.get('minAppointmentTimestamp').value
      ) || (
        new Date(this.filterForm.get('minAppointmentTimestamp').value).valueOf() >
        new Date(this.filterForm.get('maxAppointmentTimestamp').value).valueOf()
      )
    ) {
      this.appointmentTimestampErrors = true;

      const errorPanel = document.querySelector('#filtersCollapse .alert-danger span');

      if (
        this.filterForm.get('maxAppointmentTimestamp').value &&
        !this.filterForm.get('minAppointmentTimestamp').value
      ) {
        errorPanel.textContent = 'Please, enter first timestamp too';
      } else {
        errorPanel.textContent = 'First timestamp must be less then second timestamp';
      }
    } else {
      this.appointmentTimestampErrors = false;
    }
  }

  filter() {
    if (!this.itemsCount.errors && this.countChanged) {
      const page = 1;

      this.findAppointments(page);

      this.countChanged = false;
    }
  }

  getFilterForm() {
    const result: { [key: string]: any } = Object.create(null);

    Object.keys(this.filterForm.controls).forEach((key) => {
      if (this.filterForm.get(key).value) {
        result[toSnakeCase(key)] = this.filterForm.get(key).value;
      }
    });

    return result;
  }

  findAppointments(page: number) {
    const filterForm: { [key: string]: any } = this.filtered
      ? this.getFilterForm()
      : Object.create(null);

    this.appointmentService.findCount(filterForm)
      .subscribe((data: { count: number }) => {
        this.appointmentsCount = data.count;
      });

    this.appointmentService.findAll(page, this.itemsCount.value, filterForm)
      .subscribe((data: Appointment[]) => {
        this.appointments = data;

        this.filtered = true;
      });
  }

  resetFilter() {
    this.filterForm.patchValue({
      fullName: '',
      email: '',
      phoneNumber: '',
      minAppointmentTimestamp: '',
      maxAppointmentTimestamp: '',
      sort: '',
    });

    this.findAppointments(1);
  }

  pageChanged(newPageNumber: number) {
    this.findAppointments(newPageNumber);
  }

  pagesCount() {
    const flooredValue = Math.floor(this.appointmentsCount / this.itemsCount.value);

    return flooredValue < this.appointmentsCount / this.itemsCount.value ? flooredValue + 1 : flooredValue;
  }
}
