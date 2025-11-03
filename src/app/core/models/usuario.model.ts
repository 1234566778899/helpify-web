export interface Usuario {
    idusuario?: number;
    numerodocumento: string;
    nombredocumento: string;
    nombre: string;
    apellidopaterno: string;
    apellidomaterno: string;
    celular: string;
    correo: string;
    password?: string;
    fecharegistro?: Date;
    roles?: string[];
    jwt?: string;
    idRol?: number;
}

export interface UsuarioDTO {
    idusuario?: number;
    numerodocumento: string;
    nombredocumento: string;
    nombre: string;
    apellidopaterno: string;
    apellidomaterno: string;
    celular: string;
    correo: string;
    password: string;
    fecharegistro?: Date;
    roles?: string[];
    jwt?: string;
    idRol?: number;
}

export interface LoginRequest {
    nombre: string;
    password: string;
}

export interface LoginResponse {
    idusuario: number;
    numerodocumento: string;
    nombredocumento: string;
    nombre: string;
    apellidopaterno: string;
    apellidomaterno: string;
    celular: string;
    correo: string;
    roles: string[];
    jwt: string;
    idRol: number;
}