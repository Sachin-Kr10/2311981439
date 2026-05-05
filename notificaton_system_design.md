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

---

### Real-Time

We used **Socket.IO** to send notifications instantly to the user when they are online.

---

### Summary

In this stage, we created basic REST APIs and structure for notification system and added real-time support using sockets.
