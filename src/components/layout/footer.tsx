import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MathLycée</h3>
            <p className="text-muted-foreground">
              Plateforme d&apos;apprentissage des mathématiques pour les élèves du lycée français.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Niveaux</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/seconde" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Seconde
                </Link>
              </li>
              <li>
                <Link 
                  href="/premiere" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Première
                </Link>
              </li>
              <li>
                <Link 
                  href="/terminale" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terminale
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link 
                  href="/subscription" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Abonnements
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/terms" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MathLycée. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}