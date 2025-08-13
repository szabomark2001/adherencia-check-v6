AdherenciaCheck v6 — a v5 továbbfejlesztése
Tartalom:
- v5 összes funkciója megőrizve (TAJ, 8 kérdés, 0–14 csúszka, heatmap-radar, személyre szabott tanácsok, CSV export)
- Google Sheets mentés (csak befejezéskor) Netlify Functions-on át
- Admin felület (/admin): statisztikák, összesített radar, táblázat, CSV export
- HU/EN nyelvváltás, animációk, adaptív követőkérdések, gamifikáció

Telepítés (Netlify + Git):
1) Hozz létre GitHub repót és töltsd fel a mappa tartalmát.
2) Netlify → Add new site → Import from Git → válaszd a repót.
3) Netlify → Site settings → Environment variables:
   - SHEET_ID = 1YUQJJodASSjYdeMnwNYNtukQDxTElfIWmxLXJZBmS54
   - GOOGLE_SERVICE_ACCOUNT = (Service Account JSON teljes tartalma egy sorban)
   - ADMIN_TOKEN = (saját erős token az admin felülethez)
4) Google Sheet megosztása: add meg szerkesztőként a Service Account e-mail címét.
5) Deploy. A kliens oldali beküldés a /.netlify/functions/appendSheet végpontot hívja.
6) Admin: nyisd meg /admin → add meg az ADMIN_TOKEN-t → Belépés.

Megjegyzés: Ha nincs beállítva Sheets, a kliens továbbra is helyben gyűjt és CSV-be exportál.
