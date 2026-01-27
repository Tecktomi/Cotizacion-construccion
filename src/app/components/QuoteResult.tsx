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

interface QuoteResultProps {
  result: QuoteResponse;
  formData: FormData;
}

export function QuoteResult({ result, formData }: QuoteResultProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleWhatsAppContact = () => {
    const mensaje = `Hola! Recibí una cotización de ${formatCurrency(result.cotizacion || 0)} para construir ${formData.metrosCuadrados}m² y me gustaría más información.`;
    const whatsappUrl = `https://wa.me/56968749874?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = () => {
    const subject = "Consulta sobre Cotización de Construcción";
    const body = `Hola,\\n\\nRecibí una cotización para mi proyecto de construcción:\\n\\n- Metraje: ${formData.metrosCuadrados}m²\\n- Ubicación: ${formData.ubicacion}\\n- Cotización: ${formatCurrency(result.cotizacion || 0)}\\n\\nMe gustaría obtener más información.\\n\\nSaludos.`;
    const mailtoUrl = `mailto:zs8967l33t@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleDownloadPDF = () => {
    // Esta función generaría un PDF con los detalles
    // Por ahora muestra una alerta
    alert("Funcionalidad de descarga en desarrollo. Por favor contacte para recibir su cotización por email.");
  };

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
          {/* Resumen del Proyecto */}
          <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-600">Metraje</p>
              <p className="font-semibold">{formData.metrosCuadrados} m²</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ubicación</p>
              <p className="font-semibold capitalize">{formData.ubicacion.replace('-', ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cimentación</p>
              <p className="font-semibold capitalize">{formData.cimentacion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Obra Gruesa</p>
              <p className="font-semibold capitalize">{formData.obraGruesa}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Terminaciones</p>
              <p className="font-semibold capitalize">{formData.terminaciones}</p>
            </div>
          </div>

          {/* Desglose (si está disponible) */}
          {result.desglose && (
            <div className="space-y-3 pb-4 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900">Desglose de Costos</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cimentación</span>
                  <span className="font-medium">{formatCurrency(result.desglose.cimentacion)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Obra Gruesa</span>
                  <span className="font-medium">{formatCurrency(result.desglose.obraGruesa)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Terminaciones</span>
                  <span className="font-medium">{formatCurrency(result.desglose.terminaciones)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-300">
                  <span>Total</span>
                  <span className="text-blue-600">{formatCurrency(result.desglose.total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Precio por m² */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Precio por m²</span>
              <span className="text-lg font-bold text-blue-600">
                {formatCurrency((result.cotizacion || 0) / parseFloat(formData.metrosCuadrados))}
              </span>
            </div>
          </div>

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