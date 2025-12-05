export interface Asociado {
  id: string;
  nombre: string;
  identificacion: string;
  estado_pipeline: string;
  aporte_49900_pagado?: boolean;
  ultima_actualizacion?: string;
}

export type EstadoPipeline = 
  | 'Todos'
  | 'Prospecto'
  | 'Expediente en Construcción'
  | 'Pendiente Jurídico'
  | 'Pendiente Cierre de Crédito'
  | 'Pendiente Firma y Litivo'
  | 'Pendiente Revisión Abogado'
  | 'Pendiente Generar Crédito'
  | 'Cartera Activa'
  | 'Desembolsado/Finalizado';

// Datos de ejemplo para desarrollo
export const datosEjemplo: Asociado[] = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    identificacion: '123456789',
    estado_pipeline: 'Prospecto',
    aporte_49900_pagado: true,
    ultima_actualizacion: '2024-12-01T10:30:00Z'
  },
  {
    id: '2',
    nombre: 'María García',
    identificacion: '987654321',
    estado_pipeline: 'Expediente en Construcción',
    aporte_49900_pagado: false,
    ultima_actualizacion: '2024-12-02T14:45:00Z'
  },
  {
    id: '3',
    nombre: 'Carlos Rodríguez',
    identificacion: '456123789',
    estado_pipeline: 'Pendiente Jurídico',
    aporte_49900_pagado: true,
    ultima_actualizacion: '2024-12-03T09:15:00Z'
  },
  {
    id: '4',
    nombre: 'Ana López',
    identificacion: '789456123',
    estado_pipeline: 'Prospecto',
    aporte_49900_pagado: false,
    ultima_actualizacion: '2024-12-01T16:20:00Z'
  },
  {
    id: '5',
    nombre: 'Pedro Martínez',
    identificacion: '321654987',
    estado_pipeline: 'Cartera Activa',
    aporte_49900_pagado: true,
    ultima_actualizacion: '2024-12-04T11:00:00Z'
  }
];