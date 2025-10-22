function Field({ item }) {
  const { type, value, id, label } = item;
  switch (type) {
    case "textarea":
      return <textarea />;
    case "button":
      return (
        <button type={type} value={value}>
          {label}
        </button>
      );
    case "text":
    case "password":
    case "checkbox":
    case "radio":
    case "number":
    case "date":
    case "email":
    case "file":
    case "range":
    case "color":
    case "tel":
    case "url":
    case "time":
    case "month":
    case "week":
    case "datetime-local":
      if (type === "file") {
        return <input id={id} type={type} />;
      }
      if (type === "checkbox" || type === "radio") {
        return <input id={id} type={type} defaultChecked={!!value} />;
      }
      return <input id={id} type={type} defaultValue={value} />;
    default:
      return null;
  }
}

export default Field;
