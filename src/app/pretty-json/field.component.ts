import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { JsonFieldMetadata } from './json-metadata';
import { JsonField, getFields, isArray, isObject } from './utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  imports: [CommonModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FieldComponent<T extends object> {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) data!: T | T[];
  @Input({ required: true }) metadata?: JsonFieldMetadata<T>;

  get isObject() {
    return !isArray(this.data) && isObject(this.data);
  }

  get isArray() {
    return isArray(this.data);
  }

  get isPrimitive() {
    return !this.isObject && !this.isArray;
  }

  get objectFields() {
    if (!isObject(this.data)) {
      return [];
    }

    return getFields(this.data, this.metadata?.fields as any);
  }

  get arrayFields() {
    if (!isArray(this.data)) {
      return [];
    }

    return this.data.map((item) =>
      getFields(item, this.metadata?.fields as any)
    );
  }

  fieldName(_: number, field: JsonField<T>) {
    return field.name;
  }

  index(index: number) {
    return index;
  }
}
