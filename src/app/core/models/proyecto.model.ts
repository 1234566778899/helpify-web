export interface Proyecto {
    idproyecto?: number;
    nombreproyecto: string;
    descripcion: string;
    montoobjetivo: number;
    montorecaudado: number;
    fechainicio: string | Date;
    fechafin: string | Date;
    nombreorganización?: string;
    escuelabeneficiada?: string;
    cupoMaximo?: number;
    imagen: string;
}

export interface ProyectoDTO {
    idproyecto?: number;
    nombreproyecto: string;
    descripcion: string;
    montoobjetivo: number;
    montorecaudado: number;
    fechainicio: string;
    fechafin: string;
    nombreorganización?: string;
    escuelabeneficiada?: string;
    cupoMaximo?: number;
    imagen: string;
}

export interface ProyectoSoloConDatosDTO {
    idproyecto: number;
    nombreproyecto: string;
    descripcion: string;
    montoobjetivo: number;
    montorecaudado: number;
    fechainicio: string;
    fechafin: string;
    nombreorganización?: string;
    escuelabeneficiada?: string;
    cupoMaximo?: number;
    imagen: string;
}

export interface RegistroProyectoRespuestaDTO {
    mensaje: string;
    proyecto: ProyectoSoloConDatosDTO;
}