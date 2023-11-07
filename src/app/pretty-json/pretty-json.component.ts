import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonMetadata } from './json-metadata';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field.component';
import { JsonField, getFields } from './utils';

@Component({
  selector: 'app-pretty-json',
  templateUrl: './pretty-json.component.html',
  styleUrls: ['./pretty-json.component.scss'],
  imports: [CommonModule, FieldComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PrettyJsonComponent<T extends object> {
  @Input({ required: true }) data!: T;
  @Input({ required: true }) metadata!: JsonMetadata<T>;

  get fields() {
    const fields = getFields(this.data, this.metadata);
    return fields;
  }

  fieldName(_: number, field: JsonField<T>) {
    return field.name;
  }
}
