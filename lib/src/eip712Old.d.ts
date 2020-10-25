/// <reference types="node" />
export declare type TypedData = {
    type: string;
    name: string;
    value: any;
}[];
export declare function typedDataHash(typedData: TypedData): Uint8Array | Buffer;
export declare function signTypedData(typedData: TypedData, privateKey: Buffer): string;
export declare function recoverTypedData(typedData: TypedData, signature: string): string;
