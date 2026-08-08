# COCUP Visual Engine

Temiz, tek proje yapısı. GitHub reposunun köküne bu klasörün **içindeki dosyaları** yükleyin. Vercel Root Directory `./` olarak kalabilir.

- Önizleme tarayıcıda statik katmanlarla anında güncellenir.
- PNG yalnızca `PNG olarak aç / indir` tıklanınca sunucuda üretilir.
- Skor aralığı 0–4.

## Performans düzeltmesi (bu paket)

`lib/render.js` içindeki `adaptiveFiltering: true` ayarı kapatıldı
(`adaptiveFiltering: false`). Bu ayar sabit şablonlu bir görsel için
kalite farkı yaratmadan PNG encode süresini ciddi şekilde uzatıyordu —
yavaşlamanın kaynağı buydu. Ayrıca Vercel'de cold start'ta assets/sharp
binary'lerinin doğru paketlenmesi için `next.config.js` eklendi.

Test:
```bash
time curl -s "https://<domainin>/api/render?team1=aselsan&score1=2&team2=havelsan&score2=1&winnerFirst=1" -o /dev/null
```
