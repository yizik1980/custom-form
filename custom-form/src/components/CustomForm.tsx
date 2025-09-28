import { useDispatch, useSelector } from 'react-redux';
import { FieldRenderer } from './FieldRenderer';
import type { RootState } from '../store';
import { setValue } from '../form/formSlice';
import type { AnyField } from '../models/types';

export default function CustomForm() {
  const dispatch = useDispatch();
  const { schema, values } = useSelector((s: RootState) => s.form);

  const onChange = (id: string, val: unknown) => dispatch(setValue({ id, value: val }));

  const isValid = schema.fields.every((f: AnyField) =>
    f.required ? Boolean(values[f.id]) : true
  );

  return (
    <form className="flex flex-col gap-4 max-w-xl">
      <h2 className="text-2xl font-semibold">{schema.title}</h2>

      {schema.fields.map((f) => (
        <div key={f.id} className="flex flex-col gap-1">
          <label className="text-sm">{f.label}{f.required && ' *'}</label>
          <FieldRenderer
            field={f}
            value={values[f.id]}
            onChange={(v) => onChange(f.id, v)}
          />
        </div>
      ))}

      <button type="button" className="border rounded px-4 py-2" disabled={!isValid}>
        Submit (disabled until valid)
      </button>
    </form>
  );
}
