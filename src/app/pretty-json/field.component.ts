import { Component, Input } from '@angular/core';
import { JsonFieldMetadata } from './json-metadata';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  standalone: true,
})
export class FieldComponent<T> {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) data!: T;
  @Input({ required: true }) metadata!: JsonFieldMetadata<T>;
}
