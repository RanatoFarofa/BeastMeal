export interface INome {
    id?: number;
    primeiroNome?: string;
    nomeMeio?: string;
    sobrenome?: string;
    saudacao?: string;
    titulo?: string;
}

export class Nome implements INome {
    constructor(
        public id?: number,
        public primeiroNome?: string,
        public nomeMeio?: string,
        public sobrenome?: string,
        public saudacao?: string,
        public titulo?: string
    ) {}
}
