# react-admin-base-tabler

Tabler theme adapter for `react-admin-base` applications. Includes responsive sidebar layouts, authentication screens, light/dark themes and Bootstrap/Font Awesome icons.

## Development

```bash
npm install
npm run build
```

## Usage

```tsx
import {
  Breadcrumb,
  FooterLayout,
  Header,
  Login,
  MainLayout,
  Menu,
  MenuGroup,
  Reset,
  Sidebar,
} from "react-admin-base-tabler";
```

The initial API intentionally mirrors `react-admin-base-falcon` so an application can migrate its presentation layer without changing API, authentication or route behavior.

## Installation

```bash
npm install react-admin-base-tabler
```

Requires React 19 and the peer dependencies listed in `package.json`. The package imports its theme CSS automatically and is intended for browser applications using a bundler such as Vite.

## Appearance

The original `@tabler/core` stylesheet is imported without modification. Light and dark modes use Tabler's `data-bs-theme` attribute, including the sidebar, navigation and cards. The adapter stylesheet only handles application layout, responsive navigation and collapsed sidebar placement; it does not override Tabler colors, gradients or component shadows.

Theme selection uses the shared provider's local storage key, `<app.id>_theme`. A saved selection takes precedence. Without one, the initial theme follows the system's `prefers-color-scheme` setting, falling back to light when that setting is unavailable. Selecting light or dark saves the preference for subsequent visits.

## Publishing

Every push to `main` builds and checks the package. A version is published only once; bump `package.json` for a new release:

```bash
npm version patch --no-git-tag-version
git add package.json package-lock.json
git commit -m "Release next patch version"
git push origin main
```

To bootstrap the first publication, add a granular npm publish token as the GitHub Actions secret `NPM_TOKEN`. Never commit credentials. Until publishing authentication is configured, CI validates the package and reports that publication was skipped.

After the initial package exists, npm Trusted Publishing can be configured with owner `akinayturan`, repository `react-admin-base-tabler`, workflow `publish.yml`. Set the GitHub Actions variable `NPM_TRUSTED_PUBLISHING=true` and remove the token secret to use OIDC.

The workflow can also be rerun manually from Actions after configuring authentication.
