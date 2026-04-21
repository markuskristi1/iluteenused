# 💄 Iluteenused

Täisfunktsionaalne iluteenuste veebileht koos admin paneeliga.

## 🌐 Live
👉 [https://iluteenused.vercel.app/]

---

## ✨ Funktsionaalsus

### Public
- Avaleht koos pildigaleriiga
- Hinnakiri (dünaamiline)
- Info leht
- Kontakt leht (Google Maps + andmed Supabase’ist)
- Tehtud tööde galerii

### Admin
- Sisselogimine (session-based auth)
- Hinnakirja haldus (CRUD)
- Info lehe haldus (CRUD)
- Kontaktandmete muutmine
- Piltide upload ja kustutamine (Supabase Storage)

---

## 🛠️ Tehnoloogiad

- Node.js
- Express
- EJS (templating)
- Supabase (Database + Storage)
- Multer (failide upload)
- Express-session (auth)
- Vercel (deployment)

---

## 📦 Projektistruktuur

├── config/
├── controllers/
├── middleware/
├── public/
├── routes/
├── views/
├── index.js
├── package.json


---

## ⚙️ Keskkonnamuutujad (.env)

Lokaalselt töötab projekt järgmiste muutujatega:

PORT=
SESSION_SECRET=

SUPABASE_URL=
SUPABASE_SERVICE_KEY=

ADMIN_USERNAME=
ADMIN_PASSWORD_HASH=

ADMIN2_USERNAME=
ADMIN2_PASSWORD_HASH=

---

## 🚀 Käivitamine lokaalselt

```bash
npm install
node index.js

Ava:
http://localhost:5203
```
---

## 🔐 Turvalisus
Admin autentimine toimub sessionite kaudu
Paroolid on salvestatud bcrypt hashidena
Supabase Service Key kasutatakse ainult backendis

---

👩‍💻 Autor

Kristi Markus