import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="p-4 border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <Link to="/" className="text-xl font-bold text-primary">EbookCreator</Link>
            <div className="hidden md:flex gap-6">
              <Link to="#features" className="text-muted-foreground hover:text-primary transition-colors">Funkcje</Link>
              <Link to="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Cennik</Link>
              <Link to="#contact" className="text-muted-foreground hover:text-primary transition-colors">Kontakt</Link>
            </div>
          </div>
          <Link to="/login">
            <Button variant="outline">
              Zaloguj się
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Twórz i sprzedawaj e-booki w kilka minut!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Intuicyjny kreator, profesjonalne szablony i natychmiastowa publikacja.
              Rozpocznij swoją przygodę z tworzeniem e-booków już dziś!
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8">
                  Rozpocznij teraz
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Zaloguj się
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Dlaczego warto wybrać naszą platformę?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-4">Szybkie tworzenie</h3>
              <p className="text-muted-foreground">
                Intuicyjny interfejs pozwala stworzyć profesjonalnego e-booka w kilka minut.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-4">Personalizacja</h3>
              <p className="text-muted-foreground">
                Dostosuj wygląd swojego e-booka dzięki licznym szablonom i opcjom formatowania.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-4">Wsparcie 24/7</h3>
              <p className="text-muted-foreground">
                Nasz zespół jest dostępny całodobowo, by pomóc Ci w każdej sytuacji.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Zobacz przykładowe e-booki</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
              alt="Przykładowy e-book" 
              className="rounded-lg shadow-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
              alt="Przykładowy e-book" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">EbookCreator</h3>
              <p className="text-sm">
                Twoja platforma do tworzenia profesjonalnych e-booków.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Linki</h4>
              <ul className="space-y-2">
                <li><Link to="#features" className="hover:text-white transition-colors">Funkcje</Link></li>
                <li><Link to="#pricing" className="hover:text-white transition-colors">Cennik</Link></li>
                <li><Link to="#contact" className="hover:text-white transition-colors">Kontakt</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Dokumenty</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Polityka prywatności</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Regulamin</Link></li>
                <li><Link to="/gdpr" className="hover:text-white transition-colors">RODO</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2">
                <li>kontakt@ebookcreator.pl</li>
                <li>+48 123 456 789</li>
                <li>ul. Przykładowa 1, 00-000 Warszawa</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 EbookCreator. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;