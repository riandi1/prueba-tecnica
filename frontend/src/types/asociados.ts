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
  | 'Cartera Activa'
  | 'Desembolsado/Finalizado';