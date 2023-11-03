import { JsonFieldMetadata, JsonMetadata } from './json-metadata';

export type JsonField<T> = {
  name: string;
  data: T;
  metadata: JsonFieldMetadata<T>;
};

export function getFields<T extends object>(
  data: T,
  metadata: JsonMetadata<T>
): Array<JsonField<T>> {
  debugger;
  const dataFields = Object.entries(data) as Array<[keyof T, T[keyof T]]>;

  return dataFields.map(([key, value]) => {
    return {
      name: key,
      data: value,
      metadata: metadata[key],
    };
  }) as any;
}
