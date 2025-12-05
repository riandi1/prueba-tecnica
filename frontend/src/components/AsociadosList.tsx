import React from 'react';
import type { EstadoPipeline } from '../types/asociados';

const AsociadosList: React.FC = () => {
  const estados: EstadoPipeline[] = [
    'Todos',
    'Prospecto',
    'Expediente en Construcción',
    'Pendiente Jurídico',
    'Pendiente Cierre de Crédito'
  ];

  return (
    <div className="asociados-container">
      <h2>Lista de Asociados</h2>
      
      <div className="filtro-container">
        <label htmlFor="estado-filter">Filtrar por estado:</label>
        <select id="estado-filter">
          {estados.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </div>

      <div className="info-message">
        Componente AsociadosList - Estructura inicial creada
      </div>
    </div>
  );
};

export default AsociadosList;