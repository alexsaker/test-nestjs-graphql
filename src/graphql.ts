export class UserInput {
    name?: string;
    age?: number;
    email?: string;
    roles?: string[];
}

export class CollectionMetadata {
    length?: number;
}

export class Hello {
    text?: string;
}

export abstract class IMutation {
    abstract saveName(name?: string): Hello | Promise<Hello>;

    abstract saveUser(user?: UserInput): UserBasic | Promise<UserBasic>;
}

export abstract class IQuery {
    abstract hello(name: string): Hello | Promise<Hello>;

    abstract findAllUsers(): UserCollectionResult | Promise<UserCollectionResult>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Role {
    id?: string;
    name?: string;
}

export abstract class ISubscription {
    abstract helloGranted(filter: string): Hello | Promise<Hello>;

    abstract userSaved(filter: string): UserBasic | Promise<UserBasic>;
}

export class User {
    id?: string;
    name?: string;
    age?: number;
    email?: string;
    roles?: Role[];
}

export class UserBasic {
    name?: string;
    age?: number;
    email?: string;
    roles?: string[];
}

export class UserCollectionResult {
    metadata?: CollectionMetadata;
    result?: User[];
}
