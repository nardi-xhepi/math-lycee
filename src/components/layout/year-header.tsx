import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';

interface YearHeaderProps {
  title: string;
  description: string;
}

export default function YearHeader({ title, description }: YearHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-background border-b">
      <div className="container py-12">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">
            {title}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Mathématiques {title}</h1>
            <p className="text-muted-foreground mt-1">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}