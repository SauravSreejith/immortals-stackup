![StackUp Banner](https://media.discordapp.net/attachments/1155198278787411968/1171457436419375115/stackup20banner.png)
# Task Buddy
![Task Buddy](https://cdn.discordapp.com/attachments/1155198278787411968/1172039439330054184/TASK_BUDDY-removebg-preview_1.png)

A Task Management application project for TinkerHub StackUp
## Team members
1. [Saurav Sreejith](https://github.com/SauravSreejith)
2. [Karthik Dileep](https://github.com/imkarthikdileep)
## Team Id
immortals
## Link to product walkthrough
![video](https://cdn.discordapp.com/attachments/758703600163356693/1174038425486250074/Screencast_2023-11-14_224131.mp4)
## How it Works ?
This section contains a general overview on how the project works and will be divided into two sections:
#### <u>Frontend</u>
The frontend css is built using the library [Bulma](https://bulma.io/).

> Bulma is a frontend CSS framework that facilitates the design and layout aspects of web development, providing a responsive and flexible foundation for creating visually appealing websites.


When the page is loaded, the page first checks whether the backend server is online or not. It won't allow further activity initial the server comes online. A heartbeat function ensures that server is online at regular intervals. When the server is online, the page checks whether `local Storage.getItem("client-credentials")` returns a value. 

If `client-credentials` is present, the page sents a token verification request to the server and logs in the user. After a successful login, the tasks are fetched. 

If `client-credentials` is not present, the page shows the *Sign Up/Log in* interface, through which the user can *create an account / log in*. 

After fetching the tasks from the database, it appends all the tasks to the tasklist display (`message-body`) with a custom attribute `data-taskID` which stores the task ids. All button functions use this custom attribute for referencing the element for DOM Manipulation and database updation.

When a task is created, the page send a POST request to backend server along with a randomly generated task ID and task description. 

When a task is deleted, the page sends a POST request to server along with the ID of the task to be deleted. 

When the user logs out, `client-credentials` is destroyed and page is reloaded invoking the *Sign Up/Log In*
#### <u>Backend</u>
Backend is built using Express.js. Cors Middleware for express is used to enable cors. It uses quick.db for database management. 

> `quick.db` uses SQLite as its storage engine. It abstracts away some of the complexities of directly interacting with SQLite and provides a simpler interface for developers working with Node.js. Under the hood, it stores data in SQLite format, making it a convenient choice for projects that need a lightweight and quick database solution within a Node.js environment.

The backend currently listens for HTTP GET and Post requests at the following endpoints:
- GET `/status`
>Check if the server is online. 
- POST `/auth/signup`
> Sign Up authentication. 
> POST request options: username, password 
- POST `/auth/login`
> Log In authentication. 
> POST request options: username, password
- POST `/auth/hashVerify`
> Hash authentication. 
> POST request options: name, hash
- POST `/tasks/get`
> Fetch tasks form database. 
> POST request options: name, hash
- POST `/tasks/create`
> Add tasks to database. 
> POST request options: name, hash, content, id
- POST `/tasks/delete`
> Delete tasks form database. 
> POST request options: name, hash, ID 

## Libraries used

**Bulma 0.9.4**
![Bulma](https://media.discordapp.net/attachments/1155198278787411968/1173846268116750358/Picsart_23-11-14_10-10-43-210.jpg) 

**Express 4.18.2**
![express](https://media.discordapp.net/attachments/1155198278787411968/1173846225494220880/Picsart_23-11-14_10-12-43-222.jpg)

**Quick.db 9.1.7**
![quick.db](https://media.discordapp.net/attachments/1155198278787411968/1173846203243434055/Picsart_23-11-14_10-15-35-322.jpg)
## How to configure
### Requirements: 
- Download the latest LTS of Node.js from [this website](https://nodejs.org/en/)
- Download the latest version of [Git](https://git-scm.com/) and configure it.

Then open a terminal and do the following:
```
git clone https://github.com/SauravSreejith/immortals-stackup.git
cd immortals-stackup
npm install
```
This should install all the dependencies
## How to Run

- Open Terminal
- Ensure you are in the root folder of the project

#### Backend

```
cd backend
node main.js
```

#### Frontend

##### Windows
```
cd public
start index.html
```
##### Linux
```
cd public
xdg-open index.html
```
