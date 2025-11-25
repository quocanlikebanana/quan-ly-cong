export interface ITransformer {
    transform(value: unknown): unknown;
}
export type TransformerFactory = (type: string, metadata: unknown) => ITransformer | null;

