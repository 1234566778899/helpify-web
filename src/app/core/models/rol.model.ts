export interface Rol {
    idrol: number;
    nombre: string;
}

export enum RolEnum {
    ADMIN = 'ROLE_ADMIN',
    VOLUNTARIO = 'ROLE_VOLUNTARIO',
    DONANTE = 'ROLE_DONANTE'
}