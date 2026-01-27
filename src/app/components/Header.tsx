import { Building2 } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Building2 className="size-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cotizador de Construcción</h1>
            <p className="text-sm text-gray-600">V Región, Chile</p>
          </div>
        </div>
      </div>
    </header>
  );
}
