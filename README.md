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
