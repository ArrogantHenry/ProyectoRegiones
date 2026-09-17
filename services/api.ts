import axios from 'axios';
import type { comuna } from '../models/comuna';
//const idRegion = Number(route.params.id)

const api = axios.create({
    baseURL: 'http://localhost:5110/api'
});

export const obtenerRegiones = async () => {
    const response = await api.get('/Region');
    return response.data;
};

export const obtenerRegion = async (id: number) => {
    const response = await api.get(`/Region/${id}`);
    //console.log('RESPUESTA COMPLETA:', response);
    //console.log('DATA:', response.data);
    return response.data;
};

export const obtenerComunas = async (id: number) => {
  const response = await api.get(`/Region/${id}/Comuna`)
  console.log('RESPUESTA COMUNAS:', response)
  return response.data
};

export const obtenerComuna = async (
    id: number,
    idcomuna: number
) => {
    const response = await api.get(
        `/Region/${id}/comuna/${idcomuna}`
    );
    return response.data;
};

export const actualizarComuna = async (
    id: number,
    idcomuna: number,
    datos: comuna
) => {
    const response = await api.put(
        `/Region/${id}/comuna/${idcomuna}`,
        datos
    );
    return response.data;
};

export default api