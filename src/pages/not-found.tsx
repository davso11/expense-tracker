import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// TODO: update
export function NotFound() {
  return (
    <section className="center-flex container min-h-screen">
      <div className="center-flex flex-col">
        <h1>Page indisponible</h1>
        <Button
          className="mt-2"
          asChild
        >
          <Link to="/">Accueil</Link>
        </Button>
      </div>
    </section>
  );
}
