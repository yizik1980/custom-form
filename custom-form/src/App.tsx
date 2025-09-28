import type { RootState } from './store';
import { useSelector } from 'react-redux';
import CustomForm from './components/CustomForm';
import { AddFieldPanel, FieldEditorRow } from './components/FieldEditors';

export default function App() {
  const { schema } = useSelector((s: RootState) => s.form);

  return (
    <div className="p-6 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Form (Preview)</h1>
        <CustomForm />
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Form builder (edit schema)</h2>
        <AddFieldPanel />
        <div className="space-y-3">
          {schema.fields.map(f => <FieldEditorRow key={f.id} field={f} />)}
        </div>
      </div>
    </div>
  );
}