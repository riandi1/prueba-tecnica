# Prueba Técnica COAVANCOL

## Descripción General
Sistema de gestión de asociados con frontend en React + TypeScript y backend en Node.js + Express. La aplicación permite listar asociados, filtrar por estado del pipeline y actualizar estados con validaciones de negocio específicas.

## Estructura del Proyecto

### Backend (Node.js + Express)
```
backend/
├── .gitignore         # Archivo de exclusión para Git
├── package.json       # Dependencias y scripts del backend
├── server.js          # Servidor principal con la lógica de la API
├── asociados.json     # Base de datos JSON de los asociados
├── test-api.js        # Pruebas automatizadas de la API
└── test-api.html      # Interfaz web para probar la API
```

### Frontend (React + TypeScript)
```
frontend/
├── public/            # Archivos estáticos
└── src/
    ├── components/    # Componentes React
    │   └── AsociadosList.tsx  # Componente principal de la lista
    ├── hooks/         # Custom Hooks
    │   └── useAsociados.ts    # Lógica de negocio y llamadas a la API
    ├── types/         # Definiciones de TypeScript
    │   └── asociados.ts       # Interfaces y tipos
    └── App.tsx        # Componente raíz de la aplicación
```

## Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior) o yarn
- Navegador web moderno

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/riandi1/prueba-tecnica.git
cd prueba-tecnica
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```

### 3. Configurar el Frontend
```bash
cd ../frontend
npm install
```

## Ejecución

### Iniciar el Backend
```bash
cd backend
npm start
```
El servidor estará disponible en: http://localhost:3001

### Iniciar el Frontend
```bash
cd frontend
npm start
```
La aplicación estará disponible en: http://localhost:3000

## Estructura de la API

### Endpoints

#### GET /health
- **Descripción**: Verifica que el servidor esté en funcionamiento
- **Respuesta exitosa (200)**: 
  ```json
  {
    "status": "OK",
    "timestamp": "2024-12-04T05:15:30.123Z"
  }
  ```

#### GET /asociados
- **Descripción**: Obtiene todos los asociados
- **Respuesta exitosa (200)**: 
  ```json
  [
    {
      "id": "asoc001",
      "nombre": "Juan Pérez",
      "identificacion": "10203040",
      "estado_pipeline": "Prospecto",
      "aporte_49900_pagado": false,
      "ultima_actualizacion": "2024-12-04T05:15:30.123Z"
    }
  ]
  ```

#### POST /updateEstadoPipeline
- **Descripción**: Actualiza el estado de un asociado
- **Cuerpo de la petición**:
  ```json
  {
    "asociadoId": "asoc001",
    "nuevoEstado": "Expediente en Construcción"
  }
  ```
- **Respuesta exitosa (200)**:
  ```json
  {
    "success": true,
    "message": "Estado actualizado correctamente",
    "data": {
      "id": "asoc001",
      "estado_anterior": "Prospecto",
      "nuevo_estado": "Expediente en Construcción",
      "fecha_actualizacion": "2024-12-04T05:20:45.678Z"
    }
  }
  ```

## Reglas de Negocio

1. **Estados del Pipeline**:
   - Prospecto
   - Expediente en Construcción
   - Pendiente Jurídico
   - Pendiente Cierre de Crédito
   - Pendiente Firma y Litivo
   - Pendiente Revisión Abogado
   - Cartera Activa
   - Desembolsado/Finalizado

2. **Validaciones Específicas**:
   - No se puede avanzar a "Pendiente Jurídico" si `aporte_49900_pagado` es `false`
   - Las transiciones entre estados deben seguir un flujo lógico
   - Se registra automáticamente la fecha de última actualización

## Pruebas

### Pruebas de la API
Puedes probar la API de dos formas:

1. **Interfaz Web**: Abre `backend/test-api.html` en tu navegador
2. **Pruebas Automatizadas**: Ejecuta `node test-api.js` en la carpeta backend

## Herramientas de Desarrollo

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Node.js, Express
- **Control de Versiones**: Git
- **Repositorio**: [GitHub](https://github.com/riandi1/prueba-tecnica)

## Notas Adicionales

- Los datos se persisten en un archivo JSON (`asociados.json`) en el backend
- Se incluye un archivo `notas-proceso.md` con detalles de implementación
- El frontend consume datos de la API del backend
