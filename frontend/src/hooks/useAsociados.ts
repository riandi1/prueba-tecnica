import { useState, useEffect, useCallback } from 'react';
import type { EstadoPipeline } from '../types/asociados';
import type { Asociado } from '../types/asociados';

interface UseAsociadosReturn {
  asociados: Asociado[];
  todosAsociados: Asociado[];
  loading: boolean;
  error: string | null;
  filtro: EstadoPipeline;
  setFiltro: (filtro: EstadoPipeline) => void;
  estadosDisponibles: EstadoPipeline[];
  refreshAsociados: () => Promise<void>;
}

const useAsociados = (): UseAsociadosReturn => {
  const [asociados, setAsociados] = useState<Asociado[]>([]);
  const [todosAsociados, setTodosAsociados] = useState<Asociado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<EstadoPipeline>('Todos');

  // Estados disponibles para el filtro (incluyendo "Todos")
  const estadosDisponibles: EstadoPipeline[] = [
    'Todos',
    'Prospecto',
    'Expediente en Construcción',
    'Pendiente Jurídico',
    'Pendiente Cierre de Crédito',
    'Pendiente Firma y Litivo',
    'Pendiente Revisión Abogado',
    'Pendiente Generar Crédito',
    'Cartera Activa',
    'Desembolsado/Finalizado'
  ];

  // Función para cargar los datos desde GitHub API
  const fetchAsociados = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Cargando datos desde GitHub API');
      
      const response = await fetch('https://raw.githubusercontent.com/managerrojo/COAVANCOL-Prueba-T-cnica-/refs/heads/main/IndexAsociados');
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Los datos recibidos no son un array válido');
      }
      
      // Transformar y validar datos
      const asociadosTransformados: Asociado[] = data.map((item: any) => ({
        id: item.id || '',
        nombre: item.Nombre || '',
        identificacion: item.Identificación || '',
        estado_pipeline: item.estado_pipeline || '',
        aporte_49900_pagado: false,
        ultima_actualizacion: new Date().toISOString()
      }));
      
      // Ordenar alfabéticamente por nombre
      const sortedData = [...asociadosTransformados].sort((a: Asociado, b: Asociado) => 
        a.nombre.localeCompare(b.nombre)
      );
      
      setTodosAsociados(sortedData);
      setAsociados(sortedData); // Inicialmente mostrar todos
      
    } catch (err) {
      console.error('Error al cargar asociados:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar los datos';
      setError(errorMessage);
      setTodosAsociados([]);
      setAsociados([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Efecto para cargar datos iniciales
  useEffect(() => {
    fetchAsociados();
  }, [fetchAsociados]);

  // Efecto para aplicar filtro cuando cambia
  useEffect(() => {
    if (filtro === 'Todos') {
      setAsociados(todosAsociados);
    } else {
      const filtered = todosAsociados.filter(
        asociado => asociado.estado_pipeline === filtro
      );
      setAsociados(filtered);
    }
  }, [filtro, todosAsociados]);

  // Función para refrescar datos manualmente
  const refreshAsociados = async () => {
    await fetchAsociados();
  };

  return {
    asociados,
    todosAsociados,
    loading,
    error,
    filtro,
    setFiltro,
    estadosDisponibles,
    refreshAsociados
  };
};

export default useAsociados;