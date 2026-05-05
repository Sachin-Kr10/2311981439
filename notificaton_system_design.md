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


## Stage 3 — Query Optimization (Code + Changes)

### Changes Made

1. Optimized query (avoid `SELECT *`, added limit)
2. Added composite index
3. Added pagination in API
4. Added unread-only filter optimization


### Updated SQL Query

SELECT id, title, message, created_at
FROM notifications
WHERE student_id = ? AND is_read = FALSE
ORDER BY created_at DESC
LIMIT ? OFFSET ?;

### Index Added

CREATE INDEX idx_student_read_created
ON notifications(student_id, is_read, created_at DESC);


### Repository Changes (`notification.repository.js`)

exports.getUnread = async (userId, { limit = 20, page = 1 }) => {
  const offset = (page - 1) * limit

  const [rows] = await db.execute(
    `SELECT id, title, message, created_at
     FROM notifications
     WHERE user_id = ? AND is_read = FALSE
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [userId, +limit, +offset]
  )

  return rows
}

### Controller Changes (`notification.controller.js`)

exports.getUnread = async (req, res) => {
  const data = await service.getUnread(req.user.id, req.query)
  res.json(data)
}


### Route Added (`notification.routes.js`)

router.get('/unread', auth, controller.getUnread)


### Placement Query

SELECT DISTINCT student_id
FROM notifications
WHERE notification_type = 'Placement'
AND created_at >= NOW() - INTERVAL 7 DAY;

### Summary

* Improved query performance using index
* Reduced data fetch size
* Added pagination
* Added unread API for better efficiency



## Stage 4 — Performance & Scaling

In this stage, we improved performance .


### Problem

* Notifications fetched on every page load
* Database overloaded
* Slow response time

### Solutions Implemented

## 1. Pagination

Fetch only 10–20 notifications per request

reduces DB load

#### 2. Optimized Query + Index

* Used index on (user_id, is_read, created_at)
* Faster filtering and sorting


#### 3. Real-time using **Socket.IO**

* Send new notifications instantly
* Avoid repeated API calls

 reduces unnecessary requests

---

#### 4. Avoid Frequent API Calls

* Do not call API on every page reload
* Fetch once and update using socket

---

#### 5. Mark-all-read Optimization

* Use `last_read_at` instead of updating all rows

 avoids heavy DB updates

---

#### 6. Select Required Fields Only

Avoid `SELECT *`
Fetch only needed columns

### Tradeoffs

* Slight delay if socket fails
* More logic on frontend
* Requires connection handling

---

### Final Approach

* Initial load → API
* Updates → Socket
* DB queries → optimized with index + limit

### Summary

In this stage, we improved performance using pagination, indexing, optimized queries.


## Stage 5 — Notification (Notify All)

In this stage, we handled the case where HR sends notification to all students (50,000 users).


### Problem

* Sending notifications to all users at once
* Can overload server and database
* Email + in-app both required


### Solution

#### 1. Use Queue System

* Instead of sending all at once
* Push jobs into queue
* Process one by one (async)


#### 2. Worker Processing

* Worker reads queue
* Sends:

  * Email
  * In-app notification

#### 3. Batch Processing

* Send notifications in batches (e.g., 100–500 users at a time)
* Avoid server crash


### Flow

1. HR clicks "Notify All"
2. Backend adds jobs to queue
3. Worker processes jobs
4. Notifications delivered

### Tradeoffs

* Slight delay in delivery
* More system complexity
* Requires worker setup


### Summary

In this stage, we improved bulk notification handling using queue and batch processing to avoid system overload.



## Stage 6 — Priority Inbox (Top 10 Notifications)

In this stage, we implemented a Priority Inbox that shows top 10 most important unread notifications.


### Approach

* Assign priority weight:

  * Placement = 3
  * Result = 2
  * Event = 1
* Combine with recency (latest first)
* Maintain only top 10 notifications

### Code (JavaScript)

function getWeight(type) {
  if (type === 'Placement') return 3
  if (type === 'Result') return 2
  return 1
}



### How it works

* Filters unread notifications
* Calculates score using weight + time
* Sorts by score
* Returns top 10


### Maintaining Top 10 Efficiently

* Keep only top 10 in memory
* On new notification:

  * Add new item
  * Re-sort
  * Remove lowest


### Cons

* Sorting cost for large data
* Needs memory handling


### Summary

In this stage, we implemented priority inbox using weight + recency and returned top 10 notifications efficiently.

## Stage 7 — Frontend (React Application)

In this stage, we built a simple frontend using React to display notifications and priority inbox.



### Features Implemented

* Display all notifications
* Display priority inbox (top 10)
* Real-time updates using **Socket.IO**
* Clean UI using basic CSS


### API Integration

* GET `/notifications` → fetch all notifications
* GET `/notifications/priority` → fetch top 10 notifications

### Real-Time Flow

* User connects via socket
* Server sends new notification
* UI updates instantly

### Components

* `NotificationList` → shows all notifications
* `PriorityList` → shows top priority notifications


### Performance Improvements

* Fetch data once on load
* Avoid repeated API calls
* Use socket for updates


### Tradeoffs

* Depends on backend availability
* Socket connection handling required


### Summary

In this stage, we created a React frontend that connects with backend APIs and displays notifications with real-time updates and priority inbox.
