# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  //////////////////////////////////////////////////

1. Cài đặt:

- Cài google fonts:
  - link: `https://fonts.google.com/selection/embed`
- ## Cài react router dom:
- Cài thư viện daisyUI:
  `npm i -D daisyui@latest`
- `npm install react-hook-form`

2. Có 3 cách để naming lại tag:

  - `docker build -t ${USERNAME}/${REPOSITORY}:${TAGNAME} .`
  - `docker tag ${EXISTING-IMAGE} ${USERNAME}/${REPOSITORY}:${TAGNAME}`
  - `docker commit ${EXISTING-IMAGE} ${USERNAME}/${REPOSITORY}:${TAGNAME}`