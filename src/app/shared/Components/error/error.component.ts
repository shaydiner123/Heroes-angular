import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  @Output() handleErrorEmiiter = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onHandleError(): void {
    this.handleErrorEmiiter.emit();
  }
}
