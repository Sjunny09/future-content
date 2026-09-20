/**
 * Eén plek die een platte tekst naar John's Telegram stuurt.
 *
 * Bestond al verstopt in notifyTelegram; hier losgetrokken zodat ook andere
 * delen van de funnel alarm kunnen slaan. Aanleiding (20 september 2026): de
 * OS-bridge faalde 72 dagen lang stil, want die logt alleen naar de Vercel-
 * logs en daar kijkt niemand. Telegram was het enige signaal dat John wél
 * bereikte, dus daar hangen we de storingsmelding aan op.
 *
 * Fail-soft: lukt de ping niet, dan loggen en doorgaan. Nooit een bezoeker
 * laten wachten op een notificatie.
 */

export async function telegramPing(
  tekst: string,
  ctx: Record<string, unknown> = {},
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    console.info("[telegram] TELEGRAM_BOT_TOKEN of _CHAT_ID ontbreekt; overgeslagen", ctx)
    return false
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: tekst,
        disable_web_page_preview: true,
      }),
    })
    if (!res.ok) {
      const antwoord = await res.text().catch(() => "")
      console.error("[telegram] niet-ok", { ...ctx, status: res.status, antwoord })
      return false
    }
    return true
  } catch (err) {
    console.error("[telegram] call faalde", { ...ctx, err })
    return false
  }
}
