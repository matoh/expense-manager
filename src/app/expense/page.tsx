import ListExpenses from '../../components/Expense/ListExpenses';
import { kyselyConnection } from '../db/Database';

export const metadata = {
  title: 'Expenses'
};

export default async function ExpensePage() {
  const db = kyselyConnection();

  const expenses = await db.selectFrom('expense').selectAll().orderBy('id', 'desc').execute();

  return (
    <main>
      <ListExpenses expenses={expenses} />
    </main>
  );
}
