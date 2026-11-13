## Project Structure

This project follows a specific structure to ensure consistency and maintainability.

```
root
├── prisma
│   ├── schema
│   │   ├── schema.prisma
│   │   ├── account.prisma
│   │   ├── member.prisma
│   │   └── ...
│   ├── migrations
│   └── seed.ts
├── src
│   ├── assets
│   │   ├── images
│   │   └── icons
│   ├── app
│   │   ├── (public)
│   │   │   ├── (home)
│   │   │   ├── about
│   │   │   ├── activities
│   │   │   ├── events
│   │   │   ├── publications
│   │   │   ├── donate
│   │   │   └── contact
│   │   ├── (auth)
│   │   │   ├── login
│   │   │   └── callback
│   │   ├── account
│   │   │   ├── page.tsx
│   │   │   ├── profile
│   │   │   ├── donations
│   │   │   ├── orders
│   │   │   └── subscriptions
│   │   ├── admin
│   │   │   ├── content
│   │   │   ├── events
│   │   │   ├── members
│   │   │   ├── donations
│   │   │   ├── publications
│   │   │   ├── orders
│   │   │   ├── subscriptions
│   │   │   ├── employees
│   │   │   └── settings
│   │   └── api
│   │       ├── auth
│   │       ├── payments
│   │       └── webhooks
│   ├── components
│   │   ├── ui
│   │   ├── public
│   │   ├── admin
│   │   └── shared
│   ├── modules
│   │   ├── auth
│   │   ├── users
│   │   ├── members
│   │   ├── cms
│   │   ├── events
│   │   ├── donations
│   │   ├── publications
│   │   ├── orders
│   │   ├── subscriptions
│   │   └── employees
│   ├── lib
│   │   ├── auth
│   │   ├── prisma
│   │   ├── storage
│   │   ├── payments
│   │   └── utils
│   ├── hooks
│   ├── config
│   └── types
```
