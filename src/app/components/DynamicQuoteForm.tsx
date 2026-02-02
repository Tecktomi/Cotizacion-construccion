import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Loader2, AlertCircle, Calculator, RefreshCw } from "lucide-react";
import { QuoteResult } from "@/app/components/QuoteResult";

// Tipos para la configuración dinámica
interface FieldOption {
  value: string;
  label: string;
}

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: FieldOption[];
}

interface FormConfig {
  fields: FormField[];
}

interface QuoteResponse {
  success: boolean;
  cotizacion?: number;
  desglose?: {
    cimentacion: number;
    obraGruesa: number;
    terminaciones: number;
    total: number;
  };
  precioPorM2?: number;
  mensaje?: string;
  error?: string;
}

export function DynamicQuoteForm() {
  // URL de tu Google Apps Script Web App
  // IMPORTANTE: Esta URL debe apuntar al script DINÁMICO (GOOGLE_APPS_SCRIPT_DYNAMIC.gs)
  // Si no tienes el script configurado aún, el formulario usará datos de prueba
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXK1J9wHoi4SkUbYVk23dUGR8mwZTiDelWFti2S8f-6ky9ITtRBZpr95Q7DC2KM6sbgA/exec";
  
  // Configuración de prueba (fallback si no hay Google Sheet configurado)
  const FALLBACK_CONFIG: FormConfig = {
    fields: [
      {
        id: "metrosCuadrados",
        type: "number",
        label: "Metros Cuadrados a Construir",
        required: true
      },
      {
        id: "ubicacion",
        type: "select",
        label: "Ubicación",
        required: true,
        options: [
          { value: "valparaiso", label: "Valparaíso" },
          { value: "vina", label: "Viña del Mar" },
          { value: "quilpue", label: "Quilpué" },
          { value: "villa-alemana", label: "Villa Alemana" },
          { value: "concon", label: "Con Con" }
        ]
      },
      {
        id: "cimentacion",
        type: "select",
        label: "Cimentación",
        required: true,
        options: [
          { value: "basica", label: "Básica - Estándar económico" },
          { value: "media", label: "Media - Calidad intermedia" },
          { value: "alta", label: "Alta - Calidad superior" }
        ]
      },
      {
        id: "obraGruesa",
        type: "select",
        label: "Obra Gruesa",
        required: true,
        options: [
          { value: "basica", label: "Básica - Estándar económico" },
          { value: "media", label: "Media - Calidad intermedia" },
          { value: "alta", label: "Alta - Calidad superior" }
        ]
      },
      {
        id: "terminaciones",
        type: "select",
        label: "Terminaciones",
        required: true,
        options: [
          { value: "basica", label: "Básica - Estándar económico" },
          { value: "media", label: "Media - Calidad intermedia" },
          { value: "alta", label: "Alta - Calidad superior" }
        ]
      },
      {
        id: "nombreCliente",
        type: "text",
        label: "Nombre Completo",
        required: false
      },
      {
        id: "emailCliente",
        type: "email",
        label: "Email",
        required: false
      },
      {
        id: "telefonoCliente",
        type: "tel",
        label: "Teléfono",
        required: false
      }
    ]
  };

  const [config, setConfig] = useState<FormConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const [result, setResult] = useState<QuoteResponse | null>(null);

  // Cargar configuración del formulario al montar el componente
  useEffect(() => {
    loadFormConfig();
  }, []);

  const loadFormConfig = async () => {
    setLoadingConfig(true);
    setConfigError(null);

    try {
      const url = `${GOOGLE_SCRIPT_URL}?action=getConfig&t=${Date.now()}`;
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow'
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.fields) {
        setConfig({ fields: data.fields });
        
        // Inicializar formData con valores vacíos
        const initialData: Record<string, string> = {};
        data.fields.forEach((field: FormField) => {
          initialData[field.id] = '';
        });
        setFormData(initialData);
      } else {
        throw new Error(data.message || 'Error al cargar la configuración del formulario');
      }
    } catch (err) {
      console.error('Error al cargar configuración:', err);
      
      // Usar configuración de fallback
      console.log('Usando configuración de fallback (modo de prueba)');
      setConfig(FALLBACK_CONFIG);
      
      // Inicializar formData con configuración de fallback
      const initialData: Record<string, string> = {};
      FALLBACK_CONFIG.fields.forEach((field: FormField) => {
        initialData[field.id] = '';
      });
      setFormData(initialData);
      
      // Mostrar advertencia pero permitir usar el formulario
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
      console.warn(`No se pudo cargar desde Google Sheets: ${errorMsg}. Usando configuración de prueba.`);
    } finally {
      setLoadingConfig(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Validar campos requeridos
    if (config) {
      for (const field of config.fields) {
        if (field.required && !formData[field.id]) {
          setError(`El campo "${field.label}" es requerido`);
          setLoading(false);
          return;
        }
      }
    }

    try {
      // Construir URL con parámetros
      const params = new URLSearchParams({
        action: 'calculate',
        ...formData
      });

      const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow'
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || data.message || "Error al generar la cotización");
      }
    } catch (err) {
      console.error('Error completo:', err);
      
      let errorMessage = "Error al conectar con Google Apps Script. ";
      
      if (err instanceof TypeError && err.message.includes('fetch')) {
        errorMessage += "Verifica que el script esté desplegado correctamente y que tenga acceso 'Cualquier persona'.";
      } else {
        errorMessage += err instanceof Error ? err.message : "Error desconocido";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const renderField = (field: FormField) => {
    const value = formData[field.id] || '';

    switch (field.type) {
      case 'text':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type="text"
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.required}
            />
          </div>
        );

      case 'number':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type="number"
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              min="0"
              step="0.01"
              required={field.required}
            />
          </div>
        );

      case 'email':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type="email"
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.required}
            />
          </div>
        );

      case 'tel':
      case 'phone':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type="tel"
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.required}
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select value={value} onValueChange={(val) => handleChange(field.id, val)}>
              <SelectTrigger id={field.id}>
                <SelectValue placeholder={`Seleccione ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return null;
    }
  };

  // Estado de carga inicial
  if (loadingConfig) {
    return (
      <div className="space-y-6">
        <Card className="shadow-md">
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="size-8 animate-spin text-blue-600" />
              <p className="text-gray-600">Cargando formulario desde Google Sheets...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error al cargar configuración
  if (configError) {
    return (
      <div className="space-y-6">
        <Card className="shadow-md">
          <CardContent className="py-8">
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription className="ml-2">
                <strong>Error al cargar el formulario:</strong>
                <br />
                {configError}
              </AlertDescription>
            </Alert>
            <div className="mt-4 flex justify-center">
              <Button onClick={loadFormConfig} variant="outline">
                <RefreshCw className="mr-2 size-4" />
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Formulario no configurado
  if (!config || !config.fields || config.fields.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="shadow-md">
          <CardContent className="py-8">
            <Alert>
              <AlertCircle className="size-4" />
              <AlertDescription className="ml-2">
                No hay campos configurados en Google Sheets. 
                Verifica que la hoja "variables_formulario" tenga datos.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Separar campos requeridos y opcionales
  const requiredFields = config.fields.filter(f => f.required);
  const optionalFields = config.fields.filter(f => !f.required);

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="size-6 text-blue-600" />
            <div>
              <CardTitle>Solicite su Cotización</CardTitle>
              <CardDescription>
                Complete los datos de su proyecto y obtendrá una cotización aproximada al instante
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campos Requeridos */}
            {requiredFields.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Información del Proyecto</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {requiredFields.map(field => renderField(field))}
                </div>
              </div>
            )}

            {/* Campos Opcionales */}
            {optionalFields.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900">Información de Contacto (Opcional)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {optionalFields.map(field => renderField(field))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Generando cotización...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 size-4" />
                  Generar Cotización
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Esta cotización es aproximada. Para un presupuesto exacto, contáctenos.
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Result Display */}
      {result && result.success && config && (
        <QuoteResult result={result} formData={formData} fields={config.fields} />
      )}
    </div>
  );
}