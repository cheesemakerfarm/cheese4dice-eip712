/// <reference types="node" />
export declare type TypedData = {
    type: string;
    name: string;
    value: any;
}[];
export declare function signData(typedData: TypedData, privateKey: Buffer): string;
export declare function recoverSignature(typedData: TypedData, signature: string): string;
