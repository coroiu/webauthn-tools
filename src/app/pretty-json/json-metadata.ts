export type JsonMetadata<Data> = {
  [Property in keyof Data]: JsonFieldMetadata<Data[Property]>;
};

export type JsonFieldMetadata<Data> = {
  genericDescription?: string;
  describe?: (value: Data) => string;
  fields: Data extends object ? JsonMetadata<Data> : undefined;
};
