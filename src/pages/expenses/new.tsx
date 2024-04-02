import { NewExpenseForm } from '@/components/forms/new-expense';

export function NewExpensePage() {
  return (
    <>
      <section className="container">
        <h2 className="subtitle mb-4">Nouvelle dépense</h2>
        <NewExpenseForm />
      </section>
    </>
  );
}
