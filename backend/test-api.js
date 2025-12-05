// Pruebas para la API de COAVANCOL
// Ejecutar en: http://localhost:3001

const API_BASE = 'http://localhost:3001';

// Test 1: Health check
async function testHealth() {
    console.log('=== Test 1: Health Check ===');
    try {
        const response = await fetch(`${API_BASE}/health`);
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
    console.log('');
}

// Test 2: Obtener todos los asociados
async function testGetAsociados() {
    console.log('=== Test 2: Obtener Asociados ===');
    try {
        const response = await fetch(`${API_BASE}/asociados`);
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Total asociados:', data.length);
        console.log('Primer asociado:', data[0]);
    } catch (error) {
        console.error('Error:', error.message);
    }
    console.log('');
}

// Test 3: Actualizar estado (caso exitoso)
async function testUpdateEstadoValido() {
    console.log('=== Test 3: Actualizar Estado Válido ===');
    try {
        const payload = {
            asociadoId: "asoc001",
            nuevoEstado: "Expediente en Construcción"
        };
        
        const response = await fetch(`${API_BASE}/updateEstadoPipeline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
    console.log('');
}

// Test 4: Actualizar estado (estado inválido)
async function testUpdateEstadoInvalido() {
    console.log('=== Test 4: Actualizar Estado Inválido ===');
    try {
        const payload = {
            asociadoId: "asoc001",
            nuevoEstado: "Estado No Válido"
        };
        
        const response = await fetch(`${API_BASE}/updateEstadoPipeline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
    console.log('');
}

// Test 5: Validación aporte 49900 no pagado
async function testUpdateEstadoSinAporte() {
    console.log('=== Test 5: Intento Pendiente Jurídico sin aporte pagado ===');
    try {
        const payload = {
            asociadoId: "asoc001", // Este asociado tiene aporte_49900_pagado: false
            nuevoEstado: "Pendiente Jurídico"
        };
        
        const response = await fetch(`${API_BASE}/updateEstadoPipeline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
    console.log('');
}

// Test 6: Transición no permitida
async function testTransicionNoPermitida() {
    console.log('=== Test 6: Transición No Permitida ===');
    try {
        const payload = {
            asociadoId: "asoc002", // Está en "Expediente en Construcción"
            nuevoEstado: "Cartera Activa" // Salta varios estados
        };
        
        const response = await fetch(`${API_BASE}/updateEstadoPipeline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
    console.log('');
}

// Test 7: Asociado no encontrado
async function testAsociadoNoEncontrado() {
    console.log('=== Test 7: Asociado No Encontrado ===');
    try {
        const payload = {
            asociadoId: "asoc999",
            nuevoEstado: "Prospecto"
        };
        
        const response = await fetch(`${API_BASE}/updateEstadoPipeline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
    console.log('');
}

// Ejecutar todas las pruebas
async function runAllTests() {
    console.log('Iniciando pruebas de la API COAVANCOL...\n');
    
    await testHealth();
    await testGetAsociados();
    await testUpdateEstadoValido();
    await testUpdateEstadoInvalido();
    await testUpdateEstadoSinAporte();
    await testTransicionNoPermitida();
    await testAsociadoNoEncontrado();
    
    console.log('Pruebas completadas.');
}

// Para ejecutar en el navegador:
// 1. Abre el backend: npm start en la carpeta backend
// 2. Abre este archivo en la consola del navegador
// 3. Ejecuta: runAllTests()

// Para ejecutar con Node.js:
// npm install node-fetch
// Descomenta las siguientes líneas:

/*
const fetch = require('node-fetch');
runAllTests();
*/

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testHealth,
        testGetAsociados,
        testUpdateEstadoValido,
        testUpdateEstadoInvalido,
        testUpdateEstadoSinAporte,
        testTransicionNoPermitida,
        testAsociadoNoEncontrado,
        runAllTests
    };
}
