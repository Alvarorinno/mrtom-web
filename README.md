# MrTom — www.mrtom.cl

Sitio web de MrTom, asesoría contable, tributaria y administrativa para agencias y pymes en Chile.

## Estructura del proyecto

```
mrtom-web/
├── public/
│   └── index.html      ← Landing page principal
├── vercel.json         ← Configuración de deploy en Vercel
└── README.md
```

## Cómo deployar en Vercel

### Opción A — Desde la interfaz web (más fácil)
1. Ve a https://vercel.com y crea una cuenta gratuita
2. Haz clic en "Add New Project"
3. Sube esta carpeta directamente o conéctala desde GitHub
4. Vercel detecta automáticamente el vercel.json y hace el deploy

### Opción B — Desde terminal (Vercel CLI)
```bash
npm install -g vercel
cd mrtom-web
vercel
```

## Cómo conectar www.mrtom.cl (dominio NIC Chile)

Ver instrucciones detalladas en el documento adjunto.
Los nameservers de Vercel son:
  ns1.vercel-dns.com
  ns2.vercel-dns.com

## Pendientes antes del lanzamiento

- [ ] Reemplazar contacto@mrtom.cl con correo real
- [ ] Agregar formulario de contacto funcional (recomendado: Tally.so o Formspree)
- [ ] Conectar Google Analytics (GA4)
- [ ] Agregar meta tags de SEO (descripción, og:image)
- [ ] Foto o avatar real para la sección de testimonio
- [ ] Logo SVG oficial de MrTom
