🧬 FluXOS – Electron Desktop OS Simulator
<p align="center"><img src="https://i.imgur.com/0K2oK0W.png" width="75%"></p>

Modern masaüstü deneyimini taklit eden, pencereli arayüz, sanal dosya sistemi, uygulamalar ve anahtarla güncelleme sistemi barındıran mini bir işletim sistemi.

🖥️ EKRAN GÖRÜNTÜSÜ
<p align="center"><img src="https://i.imgur.com/8xLq3wQ.png" width="80%"></p>
⚡ ÖZELLİKLER
Masaüstü:

• Windows benzeri arayüz
• Başlat menüsü
• Görev çubuğu
• Çoklu pencere (drag, minimize, close, focus)
• Canlı saat

Sanal Disk (VFS):

• Desktop, Documents, Downloads, Pictures, Music, Videos klasörleri
• Dosya oluştur / sil / yeniden adlandır
• Text & JSON dosya okuma
• Disk kullanım hesabı
• Dosya yükleme

<p align="center"><img src="https://i.imgur.com/m9DTxhw.png" width="70%"></p>
🧩 DAHİLİ UYGULAMALAR
Not Defteri
<p align="center"><img src="https://i.imgur.com/L8py1gC.png" width="60%"></p> • Yazı yazma • Kaydet / yükle
Paint
<p align="center"><img src="https://i.imgur.com/ySP1uIq.png" width="60%"></p> • Canvas çizim • Renk seçici • Temizleme
Hesap Makinesi

• Basit dört işlem

Tarayıcı

• URL gir
• Dış tarayıcıda aç

Terminal
<p align="center"><img src="https://i.imgur.com/8GTtZTf.png" width="60%"></p>

Komutlar:
help, clear, date, sysinfo

Sistem Bilgisi

• CPU sayısı
• RAM
• Platform
• Sürüm

🔧 GÜNCELLEME SİSTEMİ
1) Otomatik Güncelleme

• electron-updater ile sürüm kontrolü
• Yükleme pop-up bildirimi

2) Anahtar ile Güncelleme (Key Update System)

• Ayarlardan “Update Key” girilir
• GitHub’dan key doğrulanır
• Versiyon bilgisi çekilir
• updates/<version>/ içindeki dosyalar indirilir

<p align="center"><img src="https://i.imgur.com/YeEJl3S.png" width="60%"></p>

Kullanım amaçları:
• Premium güncelleme
• Beta sürümü erişimi
• Lisans/Müşteri güncellemeleri

📁 PROJE YAPISI

FluXOS/
├── src/
│ ├── index.html
│ ├── js/main.js
│ ├── css/style.css
├── main.js
├── preload.js
├── package.json

🛠️ KURULUM

npm install
npm start

Build almak için:
npm run build

🔮 YOL HARİTASI

• Uygulama mağazası
• Dark mode
• Çoklu kullanıcı sistemi
• Gelişmiş dosya görüntüleyici
• Tema sistemi

📜 LİSANS

MIT

<p align="center"><b>FluXOS – Küçük ama gerçek bir işletim sistemi deneyimi.</b> 🚀</p>
