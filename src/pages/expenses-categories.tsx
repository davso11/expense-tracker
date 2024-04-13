import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/category-card';
import { CategoryCardLoader } from '@/components/loaders/category-card-loader';
import { useNewCategoryDialog } from '@/contexts/category-dialog';
import { useExpenseCategories } from '@/hooks/expense-categories';

export function ExpenseCategoriesPage() {
  const { categoriesQuery } = useExpenseCategories();
  const { setOpen } = useNewCategoryDialog();

  const categories = categoriesQuery.data ?? undefined;

  return (
    <section className="container">
      <h2 className="subtitle mb-8">
        Catégories de dépenses
        {categories && categories.length > 0 ? ` (${categories.length})` : ''}
      </h2>

      <div>
        {/* ERROR */}
        {categoriesQuery.status === 'error' && (
          <div className="pt-3 text-red-500">
            <span>Erreur survenue.</span>
          </div>
        )}

        {/* LOADING */}
        {categoriesQuery.status === 'pending' && (
          <div className="flex flex-wrap gap-x-8 gap-y-2 pt-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <CategoryCardLoader key={idx} />
            ))}
          </div>
        )}

        {/* SUCCESS */}
        {categoriesQuery.status === 'success' &&
          (categories && categories.length > 0 ? (
            <div className="flex flex-wrap gap-x-8 gap-y-2 pt-3">
              {/* NEW CATEGORY BUTTON */}
              <div className="p-1">
                <Button
                  pill
                  variant="ghost"
                  className="mt-1 size-16 border-2 border-dashed"
                  onClick={() => setOpen(true)}
                >
                  <Plus className="text-gray-400" />
                </Button>
              </div>

              {/* CATEGORIES */}
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                />
              ))}
            </div>
          ) : (
            <div className="pt-3">
              <p>
                Aucune catégorie de trouvée. Vous pouvez en créer en cliquant{' '}
                <span
                  className="cursor-pointer font-semibold underline underline-offset-2"
                  onClick={() => setOpen(true)}
                >
                  ici
                </span>
                .
              </p>
            </div>
          ))}
      </div>
    </section>
  );
}
