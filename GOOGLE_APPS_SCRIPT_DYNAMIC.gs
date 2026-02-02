// ============================================
// GOOGLE APPS SCRIPT - FORMULARIO DINÁMICO
// ============================================
// Este script expone la configuración del formulario y realiza cálculos
// basados completamente en Google Sheets

// ID de tu Google Sheet (cámbialo por el ID de tu documento)
// El ID está en la URL: https://docs.google.com/spreadsheets/d/1jglz1wZO-zW5guB4-uyVd8zId97-D06-UMS8JtHmtzc/edit
const SPREADSHEET_ID = '1jglz1wZO-zW5guB4-uyVd8zId97-D06-UMS8JtHmtzc';

/**
 * Maneja las peticiones GET desde la aplicación web
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'getConfig';
    
    if (action === 'getConfig') {
      // Retorna la configuración del formulario
      return getFormConfig();
    } else if (action === 'calculate') {
      // Realiza el cálculo
      return calculateQuote(e);
    }
    
    return createResponse(false, null, 'Acción no válida');
    
  } catch (error) {
    Logger.log('Error en doGet: ' + error.toString());
    return createResponse(false, null, error.toString());
  }
}

/**
 * Obtiene la configuración del formulario desde la hoja "variables_formulario"
 */
function getFormConfig() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const configSheet = ss.getSheetByName('variables_formulario');
    
    if (!configSheet) {
      throw new Error('La hoja "variables_formulario" no existe');
    }
    
    // Leer todos los datos (desde fila 2, asumiendo que fila 1 son encabezados)
    const lastRow = configSheet.getLastRow();
    if (lastRow < 2) {
      throw new Error('La hoja "variables_formulario" está vacía');
    }
    
    const data = configSheet.getRange(2, 1, lastRow - 1, 5).getValues();
    
    // Construir array de campos
    const fields = [];
    
    for (let i = 0; i < data.length; i++) {
      const [variable, tipo, label, opciones, requerido] = data[i];
      
      // Saltar filas vacías
      if (!variable || !tipo) continue;
      
      const field = {
        id: String(variable).trim(),
        type: String(tipo).trim().toLowerCase(),
        label: String(label).trim(),
        required: requerido === true || requerido === 'SI' || requerido === 'si' || requerido === 1
      };
      
      // Si es un select, parsear las opciones
      if (field.type === 'select' && opciones) {
        const opcionesStr = String(opciones).trim();
        field.options = opcionesStr.split(',').map(opt => {
          const trimmed = opt.trim();
          // Formato: "valor|etiqueta" o solo "valor"
          if (trimmed.includes('|')) {
            const [value, label] = trimmed.split('|');
            return { value: value.trim(), label: label.trim() };
          } else {
            return { value: trimmed, label: trimmed };
          }
        });
      }
      
      fields.push(field);
    }
    
    return createResponse(true, { fields }, 'Configuración cargada exitosamente');
    
  } catch (error) {
    Logger.log('Error en getFormConfig: ' + error.toString());
    return createResponse(false, null, error.toString());
  }
}

/**
 * Calcula la cotización usando los valores del formulario
 * El cálculo real se hace en Google Sheets (hoja "calculo")
 */
function calculateQuote(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const calculoSheet = ss.getSheetByName('calculo');
    
    if (!calculoSheet) {
      throw new Error('La hoja "calculo" no existe');
    }
    
    // 1. Escribir los valores del formulario en la hoja "calculo"
    // Asumimos que la hoja tiene una sección "INPUTS" donde se escriben los valores
    // Formato sugerido:
    // Columna C: nombres de variables
    // Columna D: valores actuales
    
    const configSheet = ss.getSheetByName('variables_formulario');
    const configData = configSheet.getRange(2, 1, configSheet.getLastRow() - 1, 1).getValues();
    
    // Buscar cada variable en la hoja "calculo" y actualizar su valor
    for (let i = 0; i < configData.length; i++) {
      const variable = String(configData[i][0]).trim();
      if (!variable) continue;
      
      const valor = e.parameter[variable];
      if (valor !== undefined) {
        // Buscar la fila en "calculo" donde está esta variable
        updateVariableInCalculo(calculoSheet, variable, valor);
      }
    }
    
    // 2. Forzar recalculo de fórmulas
    SpreadsheetApp.flush();
    
    // 3. Leer el resultado final desde la celda especificada
    // Por defecto, asumimos que el resultado está en B2 de la hoja "calculo"
    const resultadoCelda = calculoSheet.getRange('B2').getValue();
    const cotizacionTotal = parseFloat(resultadoCelda);
    
    if (isNaN(cotizacionTotal)) {
      throw new Error('El resultado del cálculo no es un número válido');
    }
    
    // 4. Opcionalmente, leer desglose si existe
    // Asumimos que el desglose está en celdas específicas
    const desglose = {
      cimentacion: parseFloat(calculoSheet.getRange('B4').getValue()) || 0,
      obraGruesa: parseFloat(calculoSheet.getRange('B5').getValue()) || 0,
      terminaciones: parseFloat(calculoSheet.getRange('B6').getValue()) || 0,
      total: cotizacionTotal
    };
    
    // 5. Leer metros cuadrados para calcular precio por m²
    const metrosCuadrados = parseFloat(e.parameter.metrosCuadrados || e.parameter.metros_cuadrados) || 1;
    const precioPorM2 = Math.round(cotizacionTotal / metrosCuadrados);
    
    // 6. Opcionalmente, registrar en una hoja de "Registros"
    registrarCotizacion(ss, e, cotizacionTotal);
    
    return createResponse(true, {
      cotizacion: Math.round(cotizacionTotal),
      desglose: desglose,
      precioPorM2: precioPorM2,
      mensaje: 'Cotización generada exitosamente'
    });
    
  } catch (error) {
    Logger.log('Error en calculateQuote: ' + error.toString());
    return createResponse(false, null, error.toString());
  }
}

/**
 * Actualiza el valor de una variable en la hoja "calculo"
 */
function updateVariableInCalculo(sheet, variable, valor) {
  try {
    // Buscar la variable en la columna C (columna 3)
    const lastRow = sheet.getLastRow();
    const searchRange = sheet.getRange(1, 3, lastRow, 1).getValues();
    
    for (let i = 0; i < searchRange.length; i++) {
      if (String(searchRange[i][0]).trim() === variable) {
        // Encontrada, actualizar el valor en columna D (columna 4)
        sheet.getRange(i + 1, 4).setValue(valor);
        return;
      }
    }
    
    Logger.log('Variable no encontrada en calculo: ' + variable);
  } catch (error) {
    Logger.log('Error en updateVariableInCalculo: ' + error.toString());
  }
}

/**
 * Registra la cotización en una hoja de histórico (opcional)
 */
function registrarCotizacion(ss, e, cotizacion) {
  try {
    let registrosSheet = ss.getSheetByName('registros');
    
    // Si no existe la hoja, crearla
    if (!registrosSheet) {
      registrosSheet = ss.insertSheet('registros');
      // Agregar encabezados
      registrosSheet.getRange(1, 1, 1, 5).setValues([
        ['Fecha', 'Cotización', 'Datos', 'IP', 'User Agent']
      ]);
    }
    
    const fecha = new Date();
    const datosJson = JSON.stringify(e.parameter);
    const ip = e.parameter.userIp || 'N/A';
    const userAgent = e.parameter.userAgent || 'N/A';
    
    registrosSheet.appendRow([fecha, cotizacion, datosJson, ip, userAgent]);
    
  } catch (error) {
    Logger.log('Error al registrar cotización: ' + error.toString());
    // No lanzar error, es opcional
  }
}

/**
 * Crea una respuesta JSON estandarizada
 */
function createResponse(success, data, message) {
  const response = {
    success: success,
    message: message || (success ? 'OK' : 'Error')
  };
  
  if (data) {
    Object.assign(response, data);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Función auxiliar para testing
 */
function testGetConfig() {
  Logger.log('=== TEST: getConfig ===');
  try {
    const result = getFormConfig();
    const content = result.getContent();
    Logger.log('Resultado:');
    Logger.log(content);
    
    const json = JSON.parse(content);
    if (json.success) {
      Logger.log('✅ SUCCESS: ' + json.fields.length + ' campos encontrados');
    } else {
      Logger.log('❌ ERROR: ' + json.message);
    }
  } catch (error) {
    Logger.log('❌ EXCEPTION: ' + error.toString());
  }
}

function testCalculate() {
  const mockEvent = {
    parameter: {
      action: 'calculate',
      metrosCuadrados: '100',
      cimentacion: 'media',
      obraGruesa: 'alta',
      terminaciones: 'media',
      ubicacion: 'valparaiso'
    }
  };
  
  const result = calculateQuote(mockEvent);
  Logger.log(result.getContent());
}

/**
 * FUNCIONES DE DIAGNÓSTICO ADICIONALES
 */

function testSpreadsheetAccess() {
  Logger.log('=== TEST: Acceso a Spreadsheet ===');
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('✅ Spreadsheet abierto: ' + ss.getName());
    
    const sheets = ss.getSheets();
    Logger.log('Hojas encontradas (' + sheets.length + '):');
    sheets.forEach(sheet => {
      Logger.log('  - ' + sheet.getName());
    });
    
    const configSheet = ss.getSheetByName('variables_formulario');
    if (configSheet) {
      Logger.log('✅ Hoja "variables_formulario" encontrada');
      Logger.log('   Última fila: ' + configSheet.getLastRow());
      Logger.log('   Última columna: ' + configSheet.getLastColumn());
      
      // Leer primera fila (encabezados)
      const headers = configSheet.getRange(1, 1, 1, 5).getValues()[0];
      Logger.log('   Encabezados: ' + JSON.stringify(headers));
      
      // Leer segunda fila (primer dato)
      if (configSheet.getLastRow() >= 2) {
        const firstRow = configSheet.getRange(2, 1, 1, 5).getValues()[0];
        Logger.log('   Primera fila de datos: ' + JSON.stringify(firstRow));
      } else {
        Logger.log('⚠️  No hay datos (solo encabezados)');
      }
    } else {
      Logger.log('❌ Hoja "variables_formulario" NO encontrada');
    }
    
    const calculoSheet = ss.getSheetByName('calculo');
    if (calculoSheet) {
      Logger.log('✅ Hoja "calculo" encontrada');
    } else {
      Logger.log('❌ Hoja "calculo" NO encontrada');
    }
    
  } catch (error) {
    Logger.log('❌ EXCEPTION: ' + error.toString());
  }
}

function testDoGet() {
  Logger.log('=== TEST: doGet ===');
  try {
    const mockEvent = {
      parameter: {
        action: 'getConfig'
      }
    };
    
    const result = doGet(mockEvent);
    const content = result.getContent();
    Logger.log('Resultado:');
    Logger.log(content);
    
  } catch (error) {
    Logger.log('❌ EXCEPTION: ' + error.toString());
  }
}