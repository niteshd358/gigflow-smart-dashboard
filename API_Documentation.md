# API Documentation

Base URL:

```txt
https://gigflow-smart-dashboard-925n.onrender.com/api
```

---

# Authentication

## Register User

### Endpoint

```http
POST /auth/register
```

### Request Body

```json
{
  "name": "Name",
  "email": "youremail@gmail.com",
  "password": "******",
  "role": "admin/sales"
}
```

### Response

```json
{
  "token": "jwt_token"
}
```

---

# Login User

### Endpoint

```http
POST /auth/login
```

### Request Body

```json
{
  "email": "youremail@gmail.com",
  "password": "******"
}
```

---

# Leads

## Get Leads

### Endpoint

```http
GET /leads
```

### Query Params

| Param | Description |
|---|---|
| search | search by name/email |
| status | filter by status |
| source | filter by source |
| sort | newest/oldest |
| page | pagination |

---

## Create Lead

### Endpoint

```http
POST /leads
```

### Headers

```txt
Authorization: Bearer token
```

### Request Body

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "source": "instagram",
  "status": "qualified"
}
```

---

## Update Lead

### Endpoint

```http
PUT /leads/:id
```

---

## Delete Lead

### Endpoint

```http
DELETE /leads/:id
```

### Access

Admin only