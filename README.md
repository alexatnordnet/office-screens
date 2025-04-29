# Nordic Weather Dashboard

A simple weather dashboard showing temperatures in four Nordic capitals: Stockholm, Oslo, Helsinki, and Copenhagen.

## Running the project

1. Install dependencies:
```bash
npm install
```

2. Weather data is automatically fetched from the Norwegian Meteorological Institute (Yr.no) API
   - No API key required but proper attribution is displayed

3. Download city images:
```bash
chmod +x download-images.sh
./download-images.sh
```
   - This will download free images of Nordic capitals from Unsplash

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser.

## Build for production

```bash
npm run build
```

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages.

1. Install the gh-pages package if you haven't already:
```bash
npm install gh-pages --save-dev
```

2. Deploy using the npm script:
```bash
npm run deploy
```

Alternatively, you can use the included deploy.sh script:
```bash
chmod +x deploy.sh
./deploy.sh
```

The site will be available at: https://alexatnordnet.github.io/office-screens/

## Technologies used

- React
- TypeScript
- Tailwind CSS
- Vite