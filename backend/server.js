const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Estados válidos para el pipeline
const ESTADOS_VALIDOS = [
  'Prospecto',
  'Expediente en Construcción',
  'Pendiente Jurídico',
  'Pendiente Cierre de Crédito',
  'Pendiente Firma y Litivo',
  'Pendiente Revisión Abogado',
  'Cartera Activa',
  'Desembolsado/Finalizado'
];

// Transiciones lógicas permitidas
const TRANSICIONES_PERMITIDAS = {
  'Prospecto': ['Expediente en Construcción'],
  'Expediente en Construcción': ['Pendiente Jurídico'],
  'Pendiente Jurídico': ['Pendiente Revisión Abogado'],
  'Pendiente Revisión Abogado': ['Pendiente Cierre de Crédito'],
  'Pendiente Cierre de Crédito': ['Pendiente Firma y Litivo'],
  'Pendiente Firma y Litivo': ['Cartera Activa'],
  'Cartera Activa': ['Desembolsado/Finalizado'],
  'Desembolsado/Finalizado': [] // Estado final
};

// Ruta para actualizar el estado del pipeline
app.post('/updateEstadoPipeline', async (req, res) => {
  try {
    const { asociadoId, nuevoEstado } = req.body;

    // Validación básica de entrada
    if (!asociadoId || !nuevoEstado) {
      return res.status(400).json({
        success: false,
        message: 'Se requieren los campos asociadoId y nuevoEstado'
      });
    }

    // Validar que el nuevo estado sea válido
    if (!ESTADOS_VALIDOS.includes(nuevoEstado)) {
      return res.status(400).json({
        success: false,
        message: `Estado '${nuevoEstado}' no es válido. Estados permitidos: ${ESTADOS_VALIDOS.join(', ')}`
      });
    }

    // Leer el archivo de asociados
    const asociadosPath = path.join(__dirname, 'asociados.json');
    let asociados = [];
    
    try {
      const data = await fs.readFile(asociadosPath, 'utf8');
      asociados = JSON.parse(data);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al leer el archivo de asociados'
      });
    }

    // Buscar el asociado
    const asociadoIndex = asociados.findIndex(a => a.id === asociadoId);
    if (asociadoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Asociado con ID '${asociadoId}' no encontrado`
      });
    }

    const asociado = asociados[asociadoIndex];
    const estadoActual = asociado.estado_pipeline;

    // Validación especial: no permitir avanzar a "Pendiente Jurídico" si aporte_49900_pagado es false
    if (nuevoEstado === 'Pendiente Jurídico' && asociado.aporte_49900_pagado === false) {
      return res.status(400).json({
        success: false,
        message: 'No se puede avanzar al estado "Pendiente Jurídico" si el aporte de 49,900 no está pagado'
      });
    }

    // Validar transición lógica (si el estado actual no es el mismo)
    if (estadoActual !== nuevoEstado) {
      const transicionesPermitidas = TRANSICIONES_PERMITIDAS[estadoActual] || [];
      if (!transicionesPermitidas.includes(nuevoEstado)) {
        return res.status(400).json({
          success: false,
          message: `Transición no válida: no se puede pasar de "${estadoActual}" a "${nuevoEstado}". Transiciones permitidas desde "${estadoActual}": ${transicionesPermitidas.join(', ') || 'Ninguna'}`
        });
      }
    }

    // Actualizar el asociado
    asociados[asociadoIndex] = {
      ...asociado,
      estado_pipeline: nuevoEstado,
      ultima_actualizacion: new Date().toISOString()
    };

    // Guardar los cambios
    await fs.writeFile(asociadosPath, JSON.stringify(asociados, null, 2));

    res.json({
      success: true,
      message: `Estado del asociado ${asociadoId} actualizado exitosamente a "${nuevoEstado}"`,
      data: {
        asociadoId,
        estadoAnterior: estadoActual,
        nuevoEstado,
        ultima_actualizacion: asociados[asociadoIndex].ultima_actualizacion
      }
    });

  } catch (error) {
    console.error('Error en updateEstadoPipeline:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al actualizar el estado'
    });
  }
});

// Endpoint para obtener todos los asociados (para testing)
app.get('/asociados', async (req, res) => {
  try {
    const asociadosPath = path.join(__dirname, 'asociados.json');
    const data = await fs.readFile(asociadosPath, 'utf8');
    const asociados = JSON.parse(data);
    res.json(asociados);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los asociados'
    });
  }
});

// Endpoint de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
