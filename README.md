# Kajal Maruya — Digital Surprise ✨

A mobile-first, cinematic, 3D-style surprise website.

## Mobile optimization
- Portrait-first design
- Optimized for 360px, 375px, 390px, 412px and 430px widths
- Uses `100svh` to handle modern mobile browser address bars
- Landscape fallback styling included
- Horizontal photo cards are swipe-friendly
- CSS 3D perspective/tilt is disabled on mobile for smoother performance

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
1. Upload this project to a GitHub repository.
2. Import the repository into Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

## Personalization
Replace the remote demo photos in `src/main.jsx` and `src/styles.css` with:
- Kajal's real photos
- Group photos
- Real Uttarakhand images
- A real dog photo

For production, place images in `public/images/` and reference them as `/images/file-name.jpg`.
