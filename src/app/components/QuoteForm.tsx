import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle, Calculator } from "lucide-react";
import { QuoteResult } from "@/app/components/QuoteResult";

interface FormData {
  cimentacion: string;
  obraGruesa: string;
  terminaciones: string;
  ubicacion: string;
  metrosCuadrados: string;
  nombreCliente: string;
  emailCliente: string;
  telefonoCliente: string;
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
  mensaje?: string;
  error?: string;
}

export function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    cimentacion: "",
    obraGruesa: "",
    terminaciones: "",
    ubicacion: "",
    metrosCuadrados: "",
    nombreCliente: "",
    emailCliente: "",
    telefonoCliente: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QuoteResponse | null>(null);

  // URL de tu Google Apps Script Web App
  // Instrucciones para obtener esta URL están en el README
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXK1J9wHoi4SkUbYVk23dUGR8mwZTiDelWFti2S8f-6ky9ITtRBZpr95Q7DC2KM6sbgA/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Validaciones básicas
    if (!formData.cimentacion || !formData.obraGruesa || !formData.terminaciones || !formData.ubicacion) {
      setError("Por favor complete todos los campos requeridos");
      setLoading(false);
      return;
    }

    if (!formData.metrosCuadrados || parseFloat(formData.metrosCuadrados) <= 0) {
      setError("Por favor ingrese un metraje válido");
      setLoading(false);
      return;
    }

    try {
      // IMPLEMENTACIÓN REAL con mejor manejo de errores
      const urlWithParams = `${GOOGLE_SCRIPT_URL}?${new URLSearchParams(formData as any).toString()}`;
      
      const response = await fetch(urlWithParams, {
        method: 'GET',
        redirect: 'follow'
      });
      
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "Error al generar la cotización");
      }
      setLoading(false);

    } catch (err) {
      console.error('Error completo:', err);
      
      let errorMessage = "Error al conectar con Google Apps Script. ";
      
      if (err instanceof TypeError && err.message.includes('fetch')) {
        errorMessage += "Posibles causas:\n\n" +
          "1. El Google Apps Script no está desplegado correctamente\n" +
          "2. La URL del script es incorrecta\n" +
          "3. El script necesita permisos (ejecútalo manualmente primero)\n\n" +
          "Verifica la consola del navegador para más detalles y revisa SETUP_GOOGLE_APPS_SCRIPT.md";
      } else {
        errorMessage += err instanceof Error ? err.message : "Error desconocido";
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
            {/* Información del Proyecto */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Características del Proyecto</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metrosCuadrados">
                    Metros Cuadrados a Construir <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="metrosCuadrados"
                    type="number"
                    placeholder="Ej: 100"
                    value={formData.metrosCuadrados}
                    onChange={(e) => handleChange("metrosCuadrados", e.target.value)}
                    min="1"
                    step="0.01"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ubicacion">
                    Ubicación <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.ubicacion} onValueChange={(value) => handleChange("ubicacion", value)}>
                    <SelectTrigger id="ubicacion">
                      <SelectValue placeholder="Seleccione ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="valparaiso">Valparaíso</SelectItem>
                      <SelectItem value="vina">Viña del Mar</SelectItem>
                      <SelectItem value="quilpue">Quilpué</SelectItem>
                      <SelectItem value="villa-alemana">Villa Alemana</SelectItem>
                      <SelectItem value="con-con">Con Con</SelectItem>
                      <SelectItem value="quillota">Quillota</SelectItem>
                      <SelectItem value="limache">Limache</SelectItem>
                      <SelectItem value="otra">Otra (V Región)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="cimentacion">
                    Cimentación <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.cimentacion} onValueChange={(value) => handleChange("cimentacion", value)}>
                    <SelectTrigger id="cimentacion">
                      <SelectValue placeholder="Seleccione nivel de calidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basica">Básica - Estándar económico</SelectItem>
                      <SelectItem value="media">Media - Calidad intermedia</SelectItem>
                      <SelectItem value="alta">Alta - Calidad superior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="obraGruesa">
                    Obra Gruesa <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.obraGruesa} onValueChange={(value) => handleChange("obraGruesa", value)}>
                    <SelectTrigger id="obraGruesa">
                      <SelectValue placeholder="Seleccione nivel de calidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basica">Básica - Estándar económico</SelectItem>
                      <SelectItem value="media">Media - Calidad intermedia</SelectItem>
                      <SelectItem value="alta">Alta - Calidad superior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terminaciones">
                    Terminaciones <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.terminaciones} onValueChange={(value) => handleChange("terminaciones", value)}>
                    <SelectTrigger id="terminaciones">
                      <SelectValue placeholder="Seleccione nivel de calidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basica">Básica - Estándar económico</SelectItem>
                      <SelectItem value="media">Media - Calidad intermedia</SelectItem>
                      <SelectItem value="alta">Alta - Calidad superior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900">Información de Contacto (Opcional)</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombreCliente">Nombre Completo</Label>
                  <Input
                    id="nombreCliente"
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    value={formData.nombreCliente}
                    onChange={(e) => handleChange("nombreCliente", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefonoCliente">Teléfono</Label>
                  <Input
                    id="telefonoCliente"
                    type="tel"
                    placeholder="Ej: +56 9 1234 5678"
                    value={formData.telefonoCliente}
                    onChange={(e) => handleChange("telefonoCliente", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailCliente">Email</Label>
                <Input
                  id="emailCliente"
                  type="email"
                  placeholder="Ej: juan@ejemplo.cl"
                  value={formData.emailCliente}
                  onChange={(e) => handleChange("emailCliente", e.target.value)}
                />
              </div>
            </div>

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
      {result && result.success && (
        <QuoteResult result={result} formData={formData} />
      )}
    </div>
  );
}