# Client-Server Architecture with MySQL on AWS EC2

## Project Overview
In this project, I implemented a Client-Server Architecture using MySQL Database Management System (DBMS). The goal was to demonstrate how a client machine can remotely communicate with a database server over a local network within the AWS Cloud.

### Infrastructure Setup
* **Cloud Provider:** AWS
* **OS:** Ubuntu Linux (24.04 LTS)
* **Server A:** `mysql server` (Hosts the Database)
* **Server B:** `mysql client` (Connects to the Database)

---

## Step 1: EC2 Instance Provisioning
I created two EC2 instances on AWS using the Ubuntu Server AMI.
* **Instance 1:** Named `mysql server` to act as the database host.
* **Instance 2:** Named `mysql client` to act as the remote connection point.

![EC2 Instances Dashboard](./images/Picture2.png)
*(Screenshot of my AWS EC2 dashboard showing both instances running)*

---

## Step 2: Installing MySQL Server
I connected to the **`mysql server`** instance via SSH and installed the MySQL Server software.

**Commands used:**
```bash
sudo apt update
sudo apt install mysql-server -y
sudo systemctl enable mysql

```
![EC2 Instances Dashboard](./images/Picture3.png)



````markdown

## Step 3: Installation of MySQL Client

On the `mysql client` instance, I installed only the client software. This machine does not store data; it allows interaction with the remote server.

**Commands executed:**

```bash
sudo apt update
sudo apt install mysql-client -y
```

![EC2 Instances Dashboard](./images/Picture4.png)

-----

## Step 4: Configuring Network Security (Security Groups)

By default, AWS blocks external traffic to EC2 instances. To allow the Client to connect, I modified the **Security Group** of the Server.

  * **Type:** MySQL/Aurora
  * **Port:** 3306
  * **Source:** I restricted access to the specific Private IP address of the Client machine (`172.31.43.248/32`).


*(Fig 4: AWS Security Group settings allowing traffic on port 3306 from the Client IP)*

-----

![EC2 Instances Dashboard](./images/Picture5.png)

## Step 5: Configuring MySQL Bind Address

I configured the MySQL server to listen for external connections. By default, MySQL is bound to `127.0.0.1` (localhost). I changed this to `0.0.0.0` to accept connections from the client.

**File edited:** `/etc/mysql/mysql.conf.d/mysqld.cnf`

**Configuration change:**

```text
bind-address = 0.0.0.0
```

After saving the file, I restarted the service:

```bash
sudo systemctl restart mysql
```

*(Fig 5: Nano editor showing the bind-address configuration)*

-----
![EC2 Instances Dashboard](./IMAGES/Picture6.png)

## Step 6: Creating a Remote User

I logged into the MySQL shell on the Server and created a user with permissions to connect from any remote host.

**SQL Commands executed:**

```sql
-- Login to MySQL
sudo mysql

-- Create user and grant privileges
CREATE USER 'remote_user'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'remote_user'@'%';
FLUSH PRIVILEGES;
EXIT;
```

*(Fig 6: MySQL shell showing the successful creation of the remote\_user)*

-----
![EC2 Instances Dashboard](./IMAGES/Picture7.png)

## Step 7: Testing Remote Connection

From the **Client** machine, I established a connection to the **Server** using the Server's Private IP address.

**Connection Command:**

```bash
mysql -u remote_user -h 172.31.33.169 -p
```

**Verification:**
Once connected, I ran the `SHOW DATABASES;` command to verify that I was viewing the data residing on the remote server.

*(Fig 7: Successful login prompt and list of databases on the remote server)*

-----

![EC2 Instances Dashboard](./IMAGES/Picture8.png)

## Conclusion

The project was successfully completed. A secure connection was established between two distinct servers within the AWS cloud, demonstrating the fundamentals of Client-Server architecture and database networking.

```

***

### Instructions for your images:
1.  Create a folder named `images` inside your project folder.
2.  Save your screenshots into that folder.
3.  Rename your screenshots to match the names in the code above (e.g., `1_ec2_instances.png`, `7_connection_success.png`) **OR** simply edit the text inside the parentheses `(./images/...)` to match whatever your files are named.
```