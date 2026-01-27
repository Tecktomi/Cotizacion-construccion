import { Header } from "@/app/components/Header";
import { QuoteForm } from "@/app/components/QuoteForm";
import { Footer } from "@/app/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
