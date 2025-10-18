/**
 * CLIENTE DE AXIOS CONFIGURADO
 *
 * Este archivo crea una instancia de Axios con configuración personalizada.
 *
 * ¿Por qué crear una instancia en lugar de usar axios directamente?
 * 1. Configuración centralizada (baseURL, timeout, headers)
 * 2. Interceptores para manejar autenticación y errores
 * 3. Transformaciones automáticas
 */
import type { InternalAxiosRequestConfig } from "axios";
import axios, { AxiosError } from "axios";
import { API_URL, API_TIMEOUT } from "../config/constants";

// Crear instancia de Axios con configuración base
export const axiosClient = axios.create({
  baseURL: API_URL, // http://localhost:3000/api/v1
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * INTERCEPTOR DE REQUEST
 *
 * Se ejecuta ANTES de cada petición HTTP.
 * Aquí podemos modificar la petición antes de enviarla.
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Obtener el token de autenticación del localStorage
    const token = localStorage.getItem("authToken");

    // Si existe el token, agregarlo al header Authorization
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Logging para desarrollo (puedes quitarlo en producción)
    console.log(`🚀 Request: ${config.method?.toUpperCase()} ${config.url}`);

    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  },
);

/**
 * INTERCEPTOR DE RESPONSE
 *
 * Se ejecuta DESPUÉS de recibir la respuesta del servidor.
 * Aquí manejamos errores globalmente.
 */
axiosClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa (200-299), simplemente retornarla
    console.log(`✅ Response: ${response.config.url}`, response.status);
    return response;
  },
  (error: AxiosError) => {
    // Manejo de errores global

    if (error.response) {
      // El servidor respondió con un código de error (4xx, 5xx)
      const status = error.response.status;

      switch (status) {
        case 401:
          // No autenticado - redirigir al login
          console.error("❌ No autenticado");
          localStorage.removeItem("authToken");
          // Aquí podrías redirigir al login
          // window.location.href = '/login';
          break;

        case 403:
          // No autorizado - no tienes permisos
          console.error("❌ No autorizado");
          break;

        case 404:
          // Recurso no encontrado
          console.error("❌ Recurso no encontrado");
          break;

        case 500:
          // Error del servidor
          console.error("❌ Error del servidor");
          break;

        default:
          console.error(`❌ Error ${status}:`, error.response.data);
      }
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error("❌ Sin respuesta del servidor");
    } else {
      // Algo pasó al configurar la petición
      console.error("❌ Error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
