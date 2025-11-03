import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    ProyectoDTO,
    ProyectoSoloConDatosDTO,
    RegistroProyectoRespuestaDTO
} from '../models/proyecto.model';

@Injectable({
    providedIn: 'root'
})
export class ProyectoService {
    private apiUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    crearProyecto(proyecto: ProyectoDTO): Observable<RegistroProyectoRespuestaDTO> {
        return this.http.post<RegistroProyectoRespuestaDTO>(`${this.apiUrl}/proyecto`, proyecto);
    }

    listarProyectos(): Observable<ProyectoSoloConDatosDTO[]> {
        return this.http.get<ProyectoSoloConDatosDTO[]>(`${this.apiUrl}/proyectos`);
    }

    actualizarProyecto(proyecto: ProyectoDTO): Observable<ProyectoDTO> {
        return this.http.put<ProyectoDTO>(`${this.apiUrl}/proyecto`, proyecto);
    }

    eliminarProyecto(id: number): Observable<string> {
        return this.http.delete<string>(`${this.apiUrl}/proyecto/${id}`);
    }

    buscarPorNombre(nombre: string): Observable<ProyectoSoloConDatosDTO[]> {
        return this.http.get<ProyectoSoloConDatosDTO[]>(`${this.apiUrl}/buscar/nombre`, {
            params: { nombre }
        });
    }

    buscarPorMonto(monto: number): Observable<ProyectoSoloConDatosDTO[]> {
        return this.http.get<ProyectoSoloConDatosDTO[]>(`${this.apiUrl}/buscar/monto`, {
            params: { monto: monto.toString() }
        });
    }
}