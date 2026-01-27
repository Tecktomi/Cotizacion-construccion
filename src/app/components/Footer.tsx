import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Contacto</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="size-4" />
                <span>+56 9 6874 9874</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4" />
                <span>zs8967l33t@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                <span>V Región, Chile</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Información</h3>
            <p className="text-sm text-gray-600">
              Nuestras cotizaciones son aproximaciones basadas en los datos proporcionados. 
              Para un presupuesto exacto, contáctenos directamente.
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2026 Cotizador de Construcción. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
