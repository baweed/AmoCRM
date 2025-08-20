# 🚀 AmoCRM Integration API

RESTful API для интеграции с [AmoCRM](https://www.amocrm.com/), обеспечивающее двустороннюю синхронизацию данных между вашим приложением и CRM-системой.

---

## ✨ Возможности

- 🔄 Синхронизация контактов и сделок с AmoCRM в реальном времени  
- 📩 Автоматическая обработка входящих вебхуков  
- 📝 Обновление данных в CRM через PATCH-запросы  
- 🔒 Безопасная авторизация через OAuth 2.0  
- 💾 Локальное хранение данных в MySQL  
- 🐳 Полная контейнеризация с Docker  
- 🏗 Масштабируемая архитектура MVC  

---

## 🛠 Технологический стек

| Категория       | Технологии                            |
| --------------- | ------------------------------------- |
| Backend         | Node.js, Express.js, TypeScript       |
| База данных     | MySQL 8.0+, Prisma ORM                |
| Контейнеризация | Docker, Docker Compose                |
| Аутентификация  | OAuth 2.0, JWT                        |
| Деплой          | Любой хостинг, готово к развертыванию |

---

## ⚡ Быстрый старт

### 1️⃣ Клонируйте репозиторий

```bash
git clone <ваш-repo-url>
cd AmoCRM

2️⃣ Настройте окружение

Создайте файл .env:
DATABASE_URL="mysql://my_user:my_password@localhost:3306/my_database"
MYSQL_ROOT_PASSWORD=mysecretrootpassword
MYSQL_DATABASE=my_database
MYSQL_USER=my_user
MYSQL_PASSWORD=my_password
AMOCRM_CLIENT_ID=ваш_client_id
AMOCRM_CLIENT_SECRET=ваш_client_secret
AMOCRM_REDIRECT_URI=ваш_redirect_uri
AMOCRM_SUBDOMAIN=ваш_поддомен
PORT=3001

3️⃣ Запуск через Docker

docker-compose up -d


📡 API Endpoints
Вебхуки

POST /webhook — прием вебхуков от AmoCRM

GET /v4/webhooks — получение списка вебхуков

Работа с контактами

GET /v4/contacts — получение всех контактов

POST /v4/contacts — создание нового контакта

PATCH /v4/contacts/:id — обновление контакта в AmoCRM

Работа со сделками

GET /v4/leads — получение всех сделок

POST /v4/leads — создание новой сделки

PATCH /v4/leads/:id — обновление сделки в AmoCRM
\
Обновление контакта
```
PATCH /v4/contacts/12345
Content-Type: application/json

{
  "name": "Иван Иванов",
  "first_name": "Иван",
  "last_name": "Иванов",
  "custom_fields_values": [
    {
      "field_code": "PHONE",
      "values": [{"value": "+79123456789"}]
    }
  ]

}

```

Обновление сделки

```
PATCH /v4/leads/67890
Content-Type: application/json

{
  "name": "Новая сделка",
  "price": 100000,
  "status_id": "142"
}
```