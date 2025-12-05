import React from 'react';
import useAsociados from '../hooks/useAsociados';

const AsociadosList: React.FC = () => {
  const {
    asociados,
    loading,
    error,
    filtro,
    setFiltro,
    estadosDisponibles,
    refreshAsociados
  } = useAsociados();

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando asociados...</p>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="error-container">
        <h3>Error al cargar los datos</h3>
        <p>{error}</p>
        <button 
          onClick={refreshAsociados}
          className="retry-button"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="asociados-container">
      <div className="header-container">
        <h2>Lista de Asociados</h2>
        <button 
          onClick={refreshAsociados}
          className="refresh-button"
          title="Actualizar lista"
        >
          🔄 Actualizar
        </button>
      </div>
      
      <div className="stats-container">
        <p>Total de asociados: <strong>{asociados.length}</strong></p>
        <p>Filtro activo: <strong>{filtro}</strong></p>
      </div>
      
      <div className="filtro-container">
        <label htmlFor="estado-filter">Filtrar por estado:</label>
        <select
          id="estado-filter"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as any)}
          className="filtro-select"
        >
          {estadosDisponibles.map((estado) => (
            <option key={estado} value={estado}>
              {estado} {estado !== 'Todos' ? `(${asociados.filter(a => a.estado_pipeline === estado).length})` : ''}
            </option>
          ))}
        </select>
      </div>

      {asociados.length > 0 ? (
        <div className="table-container">
          <table className="asociados-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Identificación</th>
                <th>Estado Pipeline</th>
                <th>Aporte 49900</th>
              </tr>
            </thead>
            <tbody>
              {asociados.map((asociado) => (
                <tr key={asociado.id} className="asociado-row">
                  <td>{asociado.nombre}</td>
                  <td>{asociado.identificacion}</td>
                  <td>
                    <span className={`estado-badge estado-${asociado.estado_pipeline.replace(/\s+/g, '-')}`}>
                      {asociado.estado_pipeline}
                    </span>
                  </td>
                  <td>
                    {asociado.aporte_49900_pagado ? (
                      <span className="aporte-pagado">✓ Pagado</span>
                    ) : (
                      <span className="aporte-pendiente">✗ Pendiente</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-data-container">
          <p>No hay asociados con el estado seleccionado.</p>
          <button 
            onClick={() => setFiltro('Todos')}
            className="show-all-button"
          >
            Mostrar todos los asociados
          </button>
        </div>
      )}
    </div>
  );
};

export default AsociadosList;