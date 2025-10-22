# custom-form

A lightweight, framework-agnostic toolkit for building and validating dynamic forms. This repository contains reusable components, schema-driven form rendering, and utilities for validation and submission handling.

## Features
- Schema-driven form generation (JSON/YAML)
- Field-level and form-level validation
- Custom renderers for inputs, selects, radios, etc.
- Client-side and server-side friendly
- Minimal dependencies

## Quick start

Install (example with npm):
```bash
npm install --save custom-form
```

Simple usage (pseudo-code):
```js
import { renderForm, validateForm } from 'custom-form';

const schema = {
    title: "Contact",
    fields: [
        { name: "email", type: "email", label: "Email", required: true },
        { name: "message", type: "textarea", label: "Message", required: true }
    ]
};

const formHtml = renderForm(schema);
document.getElementById('root').innerHTML = formHtml;

// On submit
const result = validateForm(schema, formData);
if (result.valid) send(result.data);
```

## Schema example
```json
{
    "title": "Signup",
    "fields": [
        { "name": "username", "type": "text", "label": "Username", "required": true },
        { "name": "password", "type": "password", "label": "Password", "required": true }
    ]
}
```

## Development

Clone and install:
```bash
git clone <repo-url>
cd custom-form
npm install
```

Run build and tests:
```bash
npm run build
npm test
```

## Contributing
- Fork the repo
- Create a feature branch
- Open a pull request with tests and a short description

## License
MIT — see LICENSE for details