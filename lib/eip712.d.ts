/// <reference types="node" />
export declare type TypeEntry = {
    name: string;
    type: string;
};
export declare type Type = TypeEntry[];
export declare type Types = {
    [id: string]: Type;
};
export declare type Domain = {
    name?: string;
    version?: string;
    chainId?: number;
    verifyingContract?: string;
    salt?: string | Buffer;
};
export declare type SubData = {
    [id: string]: SubData;
} | string | Buffer | number | number[] | undefined;
export declare type Data = {
    [id: string]: SubData;
};
export declare type TypedData = {
    types: Types;
    primaryType: string;
    domain: Domain;
    message: Data;
};
export declare function typedDataHash(typedData: TypedData): Uint8Array | Buffer;
export declare function signData(typedData: TypedData, privateKey: Buffer): string;
export declare function recoverSignature(typedData: TypedData, signature: string): string;
