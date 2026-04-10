# xDevCRUD

> Platforma do zarządzania projektami developerskimi z chatem real-time, systemem plików i historią zmian.

![License](https://img.shields.io/badge/license-AGPL--3.0-purple)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green)
![React](https://img.shields.io/badge/react-18-blue)
![Fastify](https://img.shields.io/badge/fastify-4.x-black)

---

## O projekcie

xDevCRUD to fullstack aplikacja webowa inspirowana GitHubem i Slackiem. Każdy projekt ma własny kanał czatu real-time, system plików z historią zmian (kto, co i kiedy zmienił) oraz zarządzanie członkami z rolami.

Projekt powstał jako portfolio demonstrujące umiejętności fullstack — React, Tailwind CSS, Fastify, PostgreSQL oraz WebSockety.

---

## Stack technologiczny

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router v6
- WebSocket API
- Prisma.js 

**Backend**
- Fastify 4
- @fastify/jwt (autoryzacja)
- @fastify/websocket (chat real-time)
- @fastify/multipart (upload plików)
- @fastify/cors

**Baza danych**
- PostgreSQL 18
- Migracje ręczne (pliki SQL)

---

## Funkcjonalności

- Rejestracja i logowanie (JWT access token)
- Tworzenie projektów i zapraszanie członków
- Role użytkowników: `owner` / `member`
- Chat real-time per projekt (WebSocket)
- Syntax highlighting kodu w wiadomościach
- Upload i pobieranie plików projektu (prawdziwy filesystem)
- Historia zmian pliku — kto, co i kiedy zmodyfikował
- Przywracanie poprzednich wersji pliku

---

## Struktura projektu

```
xDevCRUD/
├── client/                 
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── services/
├── server/                
│   └── src/
│       ├── routes/
│       ├── plugins/
│       └── schemas/
├── database/               
│   ├── migrations/
│   └── seed.sql
└── README.md
```

---

## Instalacja i uruchomienie

### Wymagania

- Node.js >= 18
- PostgreSQL >= 18
- npm

### 1. Klonowanie repozytorium

```bash
git clone
cd xDevCRUD
```

### 2. Konfiguracja zmiennych środowiskowych

```bash
cp server/.env.example server/.env
```

Uzupełnij plik `server/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/xDevCRUD
JWT_SECRET=twoj_tajny_klucz
PORT=3000
UPLOADS_DIR=./uploads
```

### 3. Baza danych

```bash
psql -U postgres -c "CREATE DATABASE devvault;"
psql -U postgres -d devvault -f database/migrations/001_users.sql
psql -U postgres -d devvault -f database/migrations/002_projects.sql
psql -U postgres -d devvault -f database/migrations/003_messages.sql
psql -U postgres -d devvault -f database/migrations/004_files.sql
psql -U postgres -d devvault -f database/seed.sql
```

### 4. Instalacja zależności

```bash
# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 5. Uruchomienie

```bash
# Z głównego folderu — odpala frontend i backend jednocześnie
npm install
npm run dev
```
---

## Endpointy API

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/auth/register` | Rejestracja |
| POST | `/auth/login` | Logowanie |
| GET | `/auth/me` | Dane zalogowanego użytkownika |
| GET | `/projects` | Lista projektów użytkownika |
| POST | `/projects` | Utwórz projekt |
| GET | `/projects/:id` | Szczegóły projektu |
| PUT | `/projects/:id` | Edytuj projekt |
| DELETE | `/projects/:id` | Usuń projekt |
| POST | `/projects/:id/members` | Dodaj członka |
| DELETE | `/projects/:id/members/:userId` | Usuń członka |
| GET | `/projects/:id/messages` | Historia wiadomości |
| WS | `/projects/:id/chat` | WebSocket — chat real-time |
| GET | `/projects/:id/files` | Lista plików |
| POST | `/projects/:id/files` | Push nowego pliku |
| GET | `/projects/:id/files/:fileId` | Pobierz plik |
| PUT | `/projects/:id/files/:fileId` | Aktualizuj plik |
| DELETE | `/projects/:id/files/:fileId` | Usuń plik |
| GET | `/projects/:id/files/:fileId/history` | Historia zmian pliku |
| GET | `/projects/:id/files/:fileId/history/:entry` | Konkretna wersja pliku |

---




## Autor

**Jakub Kaźmierczak** — [github.com/Xdevix0(https://github.com/Xdevix0)

---

## Licencja

Projekt dostępny na licencji [AGPL-3.0](LICENSE).  
Oznacza to, że każde publiczne użycie kodu wymaga ujawnienia kodu źródłowego na tej samej licencji.
