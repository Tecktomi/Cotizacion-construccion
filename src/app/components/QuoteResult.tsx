import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { CheckCircle2, FileText, MessageCircle, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

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
}

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

interface QuoteResultProps {
  result: QuoteResponse;
  formData: Record<string, string>;
  fields: FormField[];
}

export function QuoteResult({ result, formData, fields }: QuoteResultProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleWhatsAppContact = () => {
    const mensaje = `Hola! Recibí una cotización de ${formatCurrency(result.cotizacion || 0)} y me gustaría más información.`;
    const whatsappUrl = `https://wa.me/56968749874?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = () => {
    const subject = "Consulta sobre Cotización de Construcción";
    const body = `Hola,\\n\\nRecibí una cotización para mi proyecto de construcción.\\n\\nCotización: ${formatCurrency(result.cotizacion || 0)}\\n\\nMe gustaría obtener más información.\\n\\nSaludos.`;
    const mailtoUrl = `mailto:zs8967l33t@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleDownloadPDF = () => {
    // Esta función generaría un PDF con los detalles
    // Por ahora muestra una alerta
    alert("Funcionalidad de descarga en desarrollo. Por favor contacte para recibir su cotización por email.");
  };

  // Función para formatear el valor mostrado
  const formatFieldValue = (field: FormField, value: string) => {
    // Si el campo es un select, buscar el label correspondiente
    if (field.type === 'select' && field.options) {
      const option = field.options.find(opt => opt.value === value);
      if (option) {
        return option.label;
      }
    }
    
    // Para campos numéricos, agregar unidades si es apropiado
    if (field.type === 'number' && field.id.toLowerCase().includes('metros')) {
      return `${value} m²`;
    }
    
    // Reemplazar TODOS los guiones por espacios y capitalizar
    return value.replace(/-/g, ' ');
  };

  // Filtrar solo los campos requeridos (información del proyecto)
  const projectFields = fields.filter(f => f.required);
  
  // Encontrar el campo de metros cuadrados para calcular precio por m²
  const metrosCuadradosField = fields.find(f => f.type === 'number' && f.id.toLowerCase().includes('metros'));
  const metrosCuadrados = metrosCuadradosField ? parseFloat(formData[metrosCuadradosField.id] || '0') : 0;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="size-4 text-green-600" />
        <AlertDescription className="text-green-800">
          {result.mensaje || "Cotización generada exitosamente"}
        </AlertDescription>
      </Alert>

      <Card className="shadow-md border-2 border-green-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="size-6" />
              Su Cotización
            </span>
            <span className="text-3xl font-bold text-blue-600">
              {formatCurrency(result.cotizacion || 0)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Resumen del Proyecto - Dinámico */}
          <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-gray-200">
            {projectFields.map((field) => {
              const value = formData[field.id];
              if (!value) return null;
              
              return (
                <div key={field.id}>
                  <p className="text-sm text-gray-600">{field.label}</p>
                  <p className="font-semibold capitalize">
                    {formatFieldValue(field, value)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Precio por m² - Solo si hay campo de metros cuadrados */}
          {metrosCuadrados > 0 && (
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Precio por m²</span>
                <span className="text-lg font-bold text-blue-600">
                  {formatCurrency((result.cotizacion || 0) / metrosCuadrados)}
                </span>
              </div>
            </div>
          )}

          {/* Botones de Acción */}
          <div className="space-y-3 pt-2">
            <p className="text-sm text-gray-600 text-center font-medium">
              ¿Le interesa este presupuesto? Contáctenos para más detalles
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <Button onClick={handleWhatsAppContact} variant="default" className="w-full">
                <MessageCircle className="mr-2 size-4" />
                Contactar por WhatsApp
              </Button>
              <Button onClick={handleEmailContact} variant="outline" className="w-full">
                <MessageCircle className="mr-2 size-4" />
                Contactar por Email
              </Button>
            </div>
            {/* 
            <Button onClick={handleDownloadPDF} variant="secondary" className="w-full">
              <Download className="mr-2 size-4" />
              Descargar Cotización PDF
            </Button>
            */}
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs text-yellow-800">
              <strong>Importante:</strong> Esta es una cotización aproximada basada en los datos proporcionados. 
              El presupuesto final puede variar según condiciones específicas del terreno, materiales disponibles 
              y otros factores. Para un presupuesto exacto y vinculante, por favor contáctenos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
