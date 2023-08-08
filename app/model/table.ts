

export interface Table {
    id?: number;
    name: string;
    babies: Array<MiniTable>;
}

export interface MiniTable {
    name: string;
    tag: string;
    type: string;
}


