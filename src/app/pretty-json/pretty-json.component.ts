import { Component, Input } from '@angular/core';
import { JsonMetadata } from './json-metadata';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field.component';

@Component({
  selector: 'app-pretty-json',
  templateUrl: './pretty-json.component.html',
  styleUrls: ['./pretty-json.component.scss'],
  imports: [CommonModule, FieldComponent],
  standalone: true,
})
export class PrettyJsonComponent<T> {
  @Input({ required: true }) data!: T;
  @Input({ required: true }) metadata!: JsonMetadata<T>;

  get fields() {
    return Object.entries(this.data as any);
  }
}
