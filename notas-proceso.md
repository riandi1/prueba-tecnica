# Notas del Proceso de Implementación - Prueba Técnica COAVANCOL

## Descripción General
Este documento describe las dificultades y decisiones técnicas tomadas durante la implementación de la prueba técnica para COAVANCOL.

## Tareas Implementadas

### 1. Frontend (React + TypeScript)
**Componente**: `AsociadosList`
**Hook Personalizado**: `useAsociados`

#### Dificultades Encontradas:

#### 1.1 Consumo de API desde GitHub
- **Problema**: El hook original usaba datos estáticos en lugar de consumir el JSON público desde GitHub.
- **Solución**: Modifiqué el hook `useAsociados` para realizar una petición `fetch` al endpoint de GitHub.
- **Desafío**: Manejo adecuado de errores de red y validación de datos recibidos.

#### 1.2 Manejo de Estados y Filtros
- **Problema**: Se requería un filtrado dinámico por estado del pipeline.
- **Solución**: Implementé un sistema de filtros reactivos usando `useState` y `useEffect`.
- **Desafío**: Mantener la sincronización entre el filtro seleccionado y los datos mostrados.

#### 1.3 Ordenamiento Alfabético
- **Problema**: Los datos debían mostrarse ordenados por nombre.
- **Solución**: Implementé ordenamiento usando `localeCompare` para manejar caracteres especiales en español.
- **Desafío**: Asegurar que el ordenamiento se mantuviera después de cada actualización de datos.

### 2. Backend (Node.js + Express)
**Endpoint**: `/updateEstadoPipeline`

#### Dificultades Encontradas:

#### 2.1 Validación de Estados
- **Problema**: Se debía validar que los estados siguieran una secuencia lógica.
- **Solución**: Creé un objeto `TRANSICIONES_PERMITIDAS` que define las transiciones válidas entre estados.
- **Desafío**: Definir correctamente el flujo del pipeline de negocio.

#### 2.2 Validación Específica de Aporte 49,900
- **Problema**: No se permite avanzar a "Pendiente Jurídico" si `aporte_49900_pagado` es `false`.
- **Solución**: Agregué una validación específica antes de permitir la transición.
- **Desafío**: Implementar esta regla de negocio de manera clara y mantenible.

#### 2.3 Manejo de Archivos JSON
- **Problema**: Almacenamiento persistente de datos sin base de datos.
- **Solución**: Uso del sistema de archivos con `fs.promises` para operaciones asíncronas.
- **Desafío**: Manejo de concurrencia y validación de integridad de datos.

#### 2.4 Manejo de Errores
- **Problema**: Proporcionar respuestas claras y consistentes ante diferentes escenarios de error.
- **Solución**: Implementé códigos de estado HTTP apropiados y mensajes descriptivos.
- **Desafío**: Diferenciar entre errores de validación, de negocio y técnicos.

### 3. Aspectos Técnicos

#### 3.1 TypeScript
- **Dificultad**: Definición de tipos para las interfaces y estados del pipeline.
- **Solución**: Creación de tipos específicos en `asociados.ts`.
- **Desafío**: Manejar tipos complejos para estados y transiciones.

#### 3.2 React Hooks
- **Dificultad**: Gestión de estado complejo con múltiples dependencias.
- **Solución**: Uso combinado de `useState`, `useEffect` y `useCallback`.
- **Desafío**: Optimización de renderizados y avoidance de infinite loops.

#### 3.3 CORS y Comunicación Frontend-Backend
- **Dificultad**: Configuración de CORS para permitir comunicación entre orígenes diferentes.
- **Solución**: Implementación del middleware `cors` en Express.
- **Desafío**: Configuración segura sin exponer el endpoint innecesariamente.

### 4. Decisiones Arquitectónicas

#### 4.1 Estructura de Archivos
- **Decisión**: Separación clara entre componentes, hooks y tipos.
- **Justificación**: Mejora la mantenibilidad y escalabilidad del código.

#### 4.2 Manejo de Estado
- **Decisión**: Estado local en el frontend con persistencia en JSON en backend.
- **Justificación**: Simplicidad para la prueba técnica, aunque en producción se usaría base de datos.

#### 4.3 Validaciones
- **Decisión**: Validaciones tanto en frontend como en backend.
- **Justificación**: Defensa en profundidad y mejor experiencia de usuario.

### 5. Lecciones Aprendidas

#### 5.1 Importancia de la Validación de Datos
- Los datos externos (como los de GitHub) pueden cambiar o estar malformados.
- Es crucial validar la estructura y tipo de datos antes de procesarlos.

#### 5.2 Manejo de Estados Asíncronos
- Las operaciones de red requieren manejo adecuado de estados de carga y error.
- La experiencia del usuario depende de un manejo correcto de estos estados.

#### 5.3 Documentación de Reglas de Negocio
- Las reglas de transición de estados deben estar claramente documentadas.
- Esto facilita el mantenimiento y futuras modificaciones.

### 6. Mejoras Potenciales

#### 6.1 Base de Datos
- Reemplazar el almacenamiento en JSON por una base de datos proper.
- Esto permitiría mejor manejo de concurrencia y consultas complejas.

#### 6.2 Testing
- Agregar pruebas unitarias para los hooks y componentes.
- Implementar pruebas de integración para los endpoints del backend.

#### 6.3 UI/UX
- Mejorar la interfaz con componentes más interactivos.
- Agregar indicadores visuales para las transiciones de estado.

#### 6.4 Logging y Monitoring
- Implementar un sistema de logging más robusto.
- Agregar métricas de rendimiento y uso.

## Conclusión

La implementación cumplió con todos los requisitos funcionales y técnicos solicitados. Las principales dificultades se relacionaron con:

1. **Integración de APIs externas** y manejo de datos no controlados
2. **Validación de reglas de negocio** complejas con múltiples condiciones
3. **Manejo de estado asíncrono** en React con múltiples dependencias
4. **Arquitectura limpia** para mantener el código mantenible

El resultado es una aplicación funcional que demuestra buenas prácticas de desarrollo con React, TypeScript y Node.js, con un enfoque particular en la robustez de las validaciones y la claridad del código.
