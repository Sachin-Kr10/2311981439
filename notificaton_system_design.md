# notification_system_design.md

## Stage 1 — REST API Design (Notification System)

In this stage, we designed a simple notification system for users when they are logged in.

### Core Actions

* Create notification
* Get notifications
* Mark as read
* Mark all as read
* Delete notification

### Base Endpoint

/api/v1/notifications

### APIs

**1. Create Notification**

POST /notifications

Request:

json
{
  "userId": "123",
  "title": "New Message",
  "message": "You got a message"
}

**2. Get Notifications**

GET /notifications

**3. Mark as Read**

PATCH /notifications/:id/read


**4. Mark All as Read**

PATCH /notifications/read-all

**5. Delete Notification**

DELETE /notifications/:id

### Basic Structure

* id
* userId
* title
* message
* isRead
* createdAt

### Real-Time

We used **Socket.IO** to send notifications instantly to the user when they are online.


### Summary

In this stage, we created basic REST APIs and structure for notification system and added real-time support using sockets.


## Stage 2 — Database & Storage

In this stage, we stored the notification data using **MySQL** because it is reliable and good for structured data.


### Database Schema

sql
CREATE TABLE notifications (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  title VARCHAR(255),
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


### Problems with Large Data

* Data becomes very large
* Queries become slow
* Too many updates (mark all read)

### Solutions

* Use indexes (user_id, created_at)
* Use pagination
* Use caching like Redis
* Use partitioning

### SQL Queries

**Create**

sql
INSERT INTO notifications (user_id, title, message)
VALUES (?, ?, ?);

**Get**

sql
SELECT * FROM notifications
WHERE user_id = ?
ORDER BY created_at DESC
LIMIT ? OFFSET ?;

**Mark Read**

sql
UPDATE notifications SET is_read = TRUE WHERE id = ?;

**Delete**

sql
DELETE FROM notifications WHERE id = ?;

### Summary

In this stage, we added database, schema, queries, and handled scaling problems.

