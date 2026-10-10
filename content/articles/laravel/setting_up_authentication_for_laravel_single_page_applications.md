---
title: 'Setting up authentication for Laravel single-page apps'
description: 'The three settings — CORS origins, session domain and Sanctum stateful domains — that make a separate SPA front end log in cleanly.'
date: '2022-10-11'
category: 'Laravel'
icon: 'simple-icons:laravel'
readingTime: '2 min read'
---

Suppose you have two websites that require authentication:

1. localhost:8000 (backend)
2. localhost:3000 (frontend)

### Configuration Steps:

1. Allow origins for `https://localhost:3000/`
2. Set the session domain to `http://localhost`
3. Configure Sanctum stateful domains for `http://localhost:3000`

| Setting                  | Value                    | Format                                                 |
| ------------------------ | ------------------------ | ------------------------------------------------------ |
| FRONTEND_URL             | `https://localhost:3000` | `schema://host:port` without `/` at the end of the URL |
| SESSION_DOMAIN           | `localhost`              | `host`                                                 |
| SANCTUM_STATEFUL_DOMAINS | `localhost:3000`         | `host:port`                                            |

### 1. Update `config/cors.php`

```php [config/cors.php]
return [
  'paths' => ['api/*', 'sanctum/csrf-cookie'],
  'allowed_methods' => ['*'],
  'allowed_origins' => [env('FRONTEND_URL', 'http://127.0.0.1:8000')],
  'allowed_origins_patterns' => [],
  'allowed_headers' => ['*'],
  'exposed_headers' => [],
  'max_age' => 0,
  'supports_credentials' => true,
];
```

In allowed_origins, add the `FRONTEND_URL` in the format `schema://hostname`, such as `https://localhost:3000`.

### 2. Update config/session.php

```php [config/session.php]
'domain' => env('SESSION_DOMAIN', null),
```

Set the SESSION_DOMAIN to the main host, e.g., localhost.

### 3. Update config/sanctum.php

```php [config/sanctum.php]
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
    '%s%s',
    'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
    env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : ''
))),
```

Add `SANCTUM_STATEFUL_DOMAINS` only for the main host, e.g., localhost.

Update .env file

```dotenv [.env]
APP_NAME=
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost:3000

// etc...
```

Notes:

1. The domain in `SANCTUM_STATEFUL_DOMAINS` must be part of the same domain as `SESSION_DOMAIN` (e.g., `localhost:3000` -> `localhost`).

2. The default `SESSION_LIFETIME` is set to expire after 2 hours.


::alert-info{to="https://laravel.com/docs/10.x/sanctum#spa-authentication"}
For more information, refer to the Laravel Sanctum SPA Authentication documentation
::
