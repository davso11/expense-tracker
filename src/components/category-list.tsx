import { useExpenseCategories } from '@/hooks/expense-categories';
import { CategoryCard } from './category-card';
import { CategoryCardLoader } from './loaders/category-card-loader';

export function CategoryList() {
  const { categoriesQuery } = useExpenseCategories();

  return (
    <section className="container">
      <h2 className="subtitle mb-4">Catégories</h2>

      <div>
        {/* ERROR */}
        {categoriesQuery.status === 'error' && (
          <div className="pt-3 text-red-500">
            <span>Erreur survenue</span>
          </div>
        )}

        {/* LOADING */}
        {categoriesQuery.status === 'pending' && (
          <div className="flex flex-wrap gap-8 pt-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <CategoryCardLoader key={idx} />
            ))}
          </div>
        )}

        {/* SUCCESS */}
        {categoriesQuery.status === 'success' && (
          <div className="flex flex-wrap gap-8 pt-3">
            {categoriesQuery.data!.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
