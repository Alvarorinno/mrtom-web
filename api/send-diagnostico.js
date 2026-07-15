export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { empresa, nombre, email, ecommerce, facturacion, facturas, control, dolores } = req.body;

  try {
    // 1. Email de confirmación al usuario
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Tom <tom@mrtom.cl>',
        to: email,
        subject: 'He recibido tu diagnóstico — MrTom',
        html: `
          <div style="font-family:'Inter',sans-serif; max-width:520px; margin:0 auto; background:#FAF7F2; border-radius:12px; overflow:hidden;">
            <div style="background:#0D1B2A; padding:28px 32px;">
              <span style="font-family:'Inter',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.25em; text-transform:uppercase; color:#C9A84C;">MR.</span>
              <span style="font-family:Georgia,serif; font-size:22px; font-weight:700; color:#fff;">Tom</span>
            </div>
            <div style="padding:32px;">
              <p style="font-size:16px; color:#0D1B2A; line-height:1.7;">Hola <strong>${nombre}</strong>,</p>
              <p style="font-size:15px; color:#3D4451; line-height:1.7;">Soy Tom. He recibido tu información y en breve me contactaré contigo.</p>
              <p style="font-size:15px; color:#3D4451; line-height:1.7;">Mientras tanto, si tienes alguna pregunta puedes escribirme directamente a <a href="mailto:contacto@mrtom.cl" style="color:#C9A84C;">contacto@mrtom.cl</a></p>
              <div style="border-top:1px solid #E2DFD8; margin-top:24px; padding-top:20px; font-size:13px; color:#6B7280;">
                MrTom · El consejero que tu empresa merece
              </div>
            </div>
          </div>
        `,
      }),
    });

    // 2. Email con los datos a MrTom
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Diagnóstico MrTom <tom@mrtom.cl>',
        to: 'alvaro@mrtom.cl',
        subject: `Nuevo diagnóstico — ${empresa}`,
        html: `
          <div style="font-family:'Inter',sans-serif; max-width:520px; margin:0 auto;">
            <div style="background:#0D1B2A; padding:20px 28px; border-radius:8px 8px 0 0;">
              <span style="color:#C9A84C; font-size:12px; font-weight:700; letter-spacing:0.15em; text-transform:uppercase;">Nuevo diagnóstico recibido</span>
            </div>
            <div style="background:#FAF7F2; padding:28px; border-radius:0 0 8px 8px;">
              <table style="width:100%; border-collapse:collapse; font-size:14px;">
                <tr><td style="padding:8px 0; color:#6B7280; width:40%;">Empresa</td><td style="padding:8px 0; color:#0D1B2A; font-weight:600;">${empresa}</td></tr>
                <tr><td style="padding:8px 0; color:#6B7280;">Contacto</td><td style="padding:8px 0; color:#0D1B2A; font-weight:600;">${nombre}</td></tr>
                <tr><td style="padding:8px 0; color:#6B7280;">Email</td><td style="padding:8px 0; color:#C9A84C;">${email}</td></tr>
                <tr><td style="padding:8px 0; color:#6B7280;">Ecommerce</td><td style="padding:8px 0; color:#0D1B2A;">${ecommerce}</td></tr>
                <tr><td colspan="2" style="padding:12px 0 4px; border-top:1px solid #E2DFD8;"></td></tr>
                <tr><td style="padding:8px 0; color:#6B7280;">Facturación</td><td style="padding:8px 0; color:#0D1B2A;">${facturacion}</td></tr>
                <tr><td style="padding:8px 0; color:#6B7280;">Facturas/mes</td><td style="padding:8px 0; color:#0D1B2A;">${facturas}</td></tr>
                <tr><td style="padding:8px 0; color:#6B7280;">Control</td><td style="padding:8px 0; color:#0D1B2A;">${control}</td></tr>
                <tr><td colspan="2" style="padding:12px 0 4px; border-top:1px solid #E2DFD8;"></td></tr>
                <tr><td style="padding:8px 0; color:#6B7280;">Dolores</td><td style="padding:8px 0; color:#0D1B2A;">${dolores}</td></tr>
              </table>
            </div>
          </div>
        `,
      }),
    });

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al enviar' });
  }
}
