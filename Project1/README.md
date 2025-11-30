# WEB STACK IMPLEMENTATION (LEMP STACK)- 102

## Step 1 - Installing the Nginx Web Server

In order to display web pages to our site visitors, we are going to employ Nginx, a high-performance web server. We'll use the `apt` package manager to install this package.

Since this is our first time using `apt` for this session, I'll start by updating my server's package index. Following that, I can use `apt install` to get Nginx installed:

```bash
$ sudo apt update
$ sudo apt install nginx
```
![Screenshot of output](./Images/Picture1.png)
When prompted, I'll enter `Y` to confirm that I want to install Nginx. Once the installation is finished, the Nginx web server will be active and running on my Ubuntu 20.04 server.

To verify that nginx was successfully installed and is running as a service in Ubuntu, I'll run:

```bash
$ sudo systemctl status nginx
```

If it is green and running, then I did everything correctly - I have just launched my first Web Server in the Clouds\!

![Screenshot of output](./Images/Picture2.png)



-----

## Step 1 - Installing the Nginx Web Server (Cont.)

My server is now **running**, and I can access it both locally and from the Internet (Source `0.0.0.0/0` means 'from any IP address').

First, I'll check how I can access it locally within my Ubuntu shell. I can use the `curl` command to request Nginx on port 80:

```bash
$ curl http://localhost:80
or
$ curl http://127.0.0.1:80
```

These two commands essentially do the same thing: they use the **`curl`** command to request my Nginx server on port 80. The difference is that the first command accesses the server via a **DNS name** (`localhost`), and the second uses the **IP address** (`127.0.0.1`). (The IP address `127.0.0.1` corresponds to the DNS name `localhost`, and the process of converting a DNS name to an IP address is called "resolution").

![Screenshot of output](./Images/Picture3.png)
-----

## Step 2 - Testing the Nginx Server from the Internet

Now it's time to test if my Nginx server can respond to requests from the Internet.

I'll open a web browser of my choice and try to access the following URL:

```url
http://<Public-IP-Address>:80
```

A simple way to retrieve my **Public IP address**, other than checking it in the AWS Web console, is to use this command in the server's terminal:

```bash
curl -s http://169.254.169.254/latest/meta-data/public-ipv4
```
![Screenshot of output](./Images/Picture4.png)
The URL in the browser should also work even if I **don't specify the port number** since all web browsers use **port 80 by default**.

If I see the default Nginx welcome page, then my web server is now correctly installed and accessible through my firewall.

![Screenshot of output](./Images/Picture5.png)
-----

I'll assume the next logical step in a LEMP stack implementation is to install **MySQL** (the 'M' in LEMP).

Here is the continuation of your markdown document, structured as if you are performing the steps:

-----

## Step 3 - Installing MySQL (MariaDB)

Now that I've got my Nginx web server running, the next crucial step in setting up the LEMP stack is to install the database component. I'll be using **MariaDB**, a community-developed fork of the MySQL relational database management system (RDBMS), which is typically used as the MySQL replacement in modern Ubuntu installations.

I'll use `apt` to install the MariaDB package:

```bash
$ sudo apt install mariadb-server
```

When prompted, I'll enter `Y` to confirm the installation.

![Screenshot of output](./Images/Picture6.png)
-----

## Step 4 - Securing the MariaDB Installation

The MariaDB installation is complete, but it's not yet secured for production use. To enhance the security of the MariaDB server, I will run the built-in security script. This script will prompt me to make several important configuration changes, including setting up a dedicated root password and removing insecure default settings.

I'll execute the script with the following command:

```bash
$ sudo mysql_secure_installation
```

The script will ask a series of questions:

1.  **Enter current password for root (enter for none):** Since this is a fresh installation, I'll just press **ENTER**.
2.  **Set root password? [Y/n]:** I'll type **Y** and set a strong, new password for the database root user. I'll need to enter it twice to confirm.
3.  **Remove anonymous users? [Y/n]:** I'll type **Y** to remove anonymous users, as they can be a security risk.
4.  **Disallow root login remotely? [Y/n]:** I'll type **Y**. This is a good security practice that ensures the root user can only connect from `localhost`.
5.  **Remove test database and access to it? [Y/n]:** I'll type **Y** to remove the default, insecure test database.
6.  **Reload privilege tables now? [Y/n]:** I'll type **Y** to apply the changes immediately.

Once I complete these steps, my MariaDB installation will be more secure.

-----

## Step 5 - Installing PHP and Dependencies

The final component of the LEMP stack I need to install is **PHP**. Nginx doesn't natively process PHP files; instead, it passes them to a service called **PHP-FPM** (FastCGI Process Manager). I need to install both PHP and the FPM service, along with a few packages required for PHP to communicate with the database.

I'll install all the necessary packages in one command:

```bash
$ sudo apt install php-fpm php-mysql
```

  * `php-fpm`: The FastCGI Process Manager that will handle PHP execution.
  * `php-mysql`: A required module that allows PHP to communicate with MariaDB.

I'll type **Y** to confirm the installation. Once the installation is finished, the PHP-FPM service will start automatically.

To check its status, I'll run:

```bash
$ sudo systemctl status php7.4-fpm
```

The output should show the service as `active (running)`.

-----

This is a summary. but lets take it step by step


This is the complete continuation of your markdown document for the LEMP stack implementation, written in the first person as you are performing the steps.

-----

## Step 3 - Installing MySQL (MariaDB) 💾

With Nginx successfully installed and confirmed, the next component of my LEMP stack is the database. I'll be using **MariaDB**, a popular open-source relational database, which serves as a replacement for MySQL.

I use the `apt` package manager to install the MariaDB server:

```bash
$ sudo apt install mariadb-server
```

![Screenshot of output](./Images/Picture7.png)
When prompted, I type **Y** to confirm the installation.

-----

## Step 4 - Securing the MariaDB Installation 🔒

After the installation completes, it's crucial to secure the database. I run the included security script to remove some insecure default settings and set a proper root password:

```bash
$ sudo mysql_secure_installation
```

The script asks me a series of questions. Here are the choices I make to secure my database:

1.  **Enter current password for root (enter for none):** I press **ENTER** since I haven't set a root password yet.
2.  **Set root password? [Y/n]:** I type **Y** and create a strong, new password for the database root user.
3.  **Remove anonymous users? [Y/n]:** I type **Y** to remove users who don't need dedicated authentication.
4.  **Disallow root login remotely? [Y/n]:** I type **Y**. This is a critical security step that prevents the database root user from connecting from anywhere other than the server itself (`localhost`).
5.  **Remove test database and access to it? [Y/n]:** I type **Y**.
6.  **Reload privilege tables now? [Y/n]:** I type **Y** to immediately apply all the changes I made.

My MariaDB installation is now secure\!

-----

## Step 5 - Installing PHP and Dependencies ⚙️

The final component of the LEMP stack is **PHP**, which will process my website's dynamic content. Nginx requires an external processor for PHP, which is where **PHP-FPM** (FastCGI Process Manager) comes in. I also need the package that allows PHP to communicate with MariaDB.

I install both PHP-FPM and the MySQL module in a single command:

```bash
$ sudo apt install php-fpm php-mysql
```

I type **Y** to confirm. Once complete, I verify that the PHP-FPM service is running correctly:

```bash
$ sudo systemctl status php7.4-fpm
```

I see that the service is `active (running)`, which means all the components of my LEMP stack are installed and operational\! The next step will be configuring Nginx to use PHP-FPM to serve dynamic web pages.

-----
![Screenshot of output](./Images/Picture8.png)


I'll continue your markdown document, reporting the installation and configuration of **MySQL** and **PHP** in the first person, exactly as outlined in the images you provided.

-----


I'll continue your markdown document, reporting the installation and configuration of **MySQL** and **PHP** in the first person, exactly as outlined in the images you provided.

-----

## Step 3 — Installing PHP (The 'P' in LEMP) ⚙️

I now have Nginx installed to serve content and MySQL installed to store my data. The next step is to install **PHP** to process code and generate dynamic content for the web server.

Unlike Apache, which embeds the PHP interpreter, Nginx requires an external program to handle PHP processing—this is the **PHP-FPM** (**P**HP **f**ast**CGI** **P**rocess **M**anager). I also need `php-mysql`, a PHP module that allows PHP to communicate with MySQL-based databases.

I install both packages at once:

![Screenshot of output](./Images/Picture9.png)
```bash
$ sudo apt install php-fpm php-mysql
```

Core PHP packages are automatically installed as dependencies. The next step will be to configure Nginx to use these new PHP components.

I'll continue your markdown document, reporting the installation and configuration steps as if you are the one performing them, using the content from the provided images.

-----

-----

## Step 4 — Configuring Nginx to Use PHP Processor 🌐

Now I need to configure Nginx to use PHP-FPM. I'll create **server blocks** (similar to virtual hosts in Apache) to encapsulate configuration details and prepare to host my domain. I will use **projectLEMP** as an example domain name.

On Ubuntu 20.04, Nginx has one server block enabled by default, which serves documents out of the directory at `/var/www/html`. To manage potential multiple sites more easily, instead of modifying `/var/www/html`, I'll create a dedicated directory structure for my site within `/var/www`. This leaves `/var/www/html` as the default directory to be served if a client request doesn't match any of my custom sites.

I create the root web directory for my example domain, `projectLEMP`, as follows:

```bash
$ sudo mkdir /var/www/projectLEMP
```

*(I'll continue the Nginx server block configuration in the next steps.)*

![Screenshot of output](./Images/Picture10.png)



## Step 4 — Configuring Nginx to Use PHP Processor 🌐

Now I need to configure Nginx to use PHP-FPM. I'm going to create **server blocks** (similar to virtual hosts in Apache) to hold the configuration details for my domain. For this guide, I'll be using **projectLEMP** as an example domain name.

By default, Nginx on Ubuntu 20.04 has one server block enabled, configured to serve files from the `/var/www/html` directory. While this is fine for a single site, managing multiple sites is easier if I create a separate directory structure. Instead of modifying `/var/www/html`, I'm creating a directory within `/var/www` for my `projectLEMP` website. This keeps `/var/www/html` in place as the default directory for any client request that doesn't match one of my specific sites.

I create the root web directory for my example domain, `projectLEMP`, as follows:

```bash
$ sudo mkdir /var/www/projectLEMP
```

-----

## Step 5 — Creating the Server Block Configuration ✍️

Since I'm creating a new web root directory, I need to create a new Nginx server block file. I'll copy the default one to use as a base for my `projectLEMP` configuration.
![Screenshot of output](./Images/Picture11.png)
### 5.1. Copying the Default Configuration

I copy the default configuration file to a new file named after my project:

```bash
$ sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/projectLEMP
```

### 5.2. Editing the Server Block File

Now I open the new file using `nano` (or my preferred text editor) to modify the configuration:

```bash
$ sudo nano /etc/nginx/sites-available/projectLEMP
```

Inside this file, I'll make the following changes:

1.  **Change the `root` directive:** I modify the `root` directive to point to the new project directory I created:

    ```nginx
    root /var/www/projectLEMP;
    ```

2.  **Add `server_name`:** I add the `server_name` directive to define the domain name that this server block should respond to.

    ```nginx
    server_name projectLEMP;
    ```

3.  **Configure PHP Processing:** I locate the commented-out section for handling PHP files and uncomment and modify it so Nginx knows to pass PHP requests to the PHP-FPM processor via the Unix socket:

    ```nginx
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    }
    ```

    *(Note: The exact `php7.4-fpm.sock` version might vary, so I'll ensure I use the correct version installed on my system.)*

4.  **Deny `.htaccess` access:** I'll uncomment the section to explicitly deny access to `.htaccess` files for security:

    ```nginx
    location ~ /\.ht {
        deny all;
    }
    ```

I save the file and close the editor.

*(The next step will be activating and testing this new server block.)*
![Screenshot of output](./Images/Picture12.png)
 

### 4.3. Pasting the Configuration

This creates a new blank file. I paste the following bare-bones configuration into the file:

```nginx
#/etc/nginx/sites-available/projectLEMP

server {
    listen 80;
    server_name projectLEMP www.projectLEMP;
    root /var/www/projectLEMP;

    index index.html index.htm index.php;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

*(Note: I see the example configuration uses `php8.3-fpm.sock`; I will ensure this matches the PHP version I installed.)*

I've finished the major configuration. The next step will be activating and testing this new configuration.
![Screenshot of output](./Images/Picture13.png)



Here's a quick summary of what the main directives and location blocks in this configuration do:

  * **`listen 80`**: Defines that Nginx will listen on **port 80**, the default port for HTTP.
  * **`root`**: Defines the document root where my website's files are stored (`/var/www/projectLEMP`).
  * **`index`**: Defines the order in which Nginx prioritizes index files (e.g., `index.html` before `index.php`).
  * **`server_name`**: Defines the domain names and/or IP addresses this server block should respond to.
  * **`location /`**: Contains a `try_files` directive, which checks for files matching the URI request, returning a **404 error** if the resource is not found.
  * **`location ~ \.php$`**: Handles the actual **PHP processing** by pointing Nginx to the `php-fpm` socket (e.g., `php7.4-fpm.sock`).
  * **`location ~ /\.ht`**: This final block denies service to any `.htaccess` files, ensuring they are not served to visitors since Nginx does not process them.

I finish editing, save the file (using **CTRL+X**, then **y**, then **ENTER** if using `nano`), and close it.

![Screenshot of output](./Images/Picture14.png)
-----



### 4.3. Activating and Testing the Configuration

I activate the new configuration by creating a **symbolic link** from the `sites-available` file to the `sites-enabled` directory:

```bash
$ sudo ln -s /etc/nginx/sites-available/projectLEMP /etc/nginx/sites-enabled/
```

This tells Nginx to use the new configuration when it reloads.

I test the configuration for syntax errors by typing:

```bash
$ sudo nginx -t
```

I should see a message confirming:

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

If any errors are reported, I go back to review the configuration file before continuing.



### 4.2. Final Configuration Steps

I also need to disable the default Nginx host that is currently configured to listen on port 80 for this run:

```bash
sudo unlink /etc/nginx/sites-enabled/default
```

When I'm ready, I reload Nginx to apply the changes:

```bash
$ sudo systemctl reload nginx
```

My new website is now active, but the web root `/var/www/projectLEMP` is still empty. I will create an `index.html` file in that location so that I can test my new server block works as expected.


-----



My new website is now active, but the web root `/var/www/projectLEMP` is still empty. I need to create an **index.html** file in that location so that I can test that my new server block works as expected:

```bash
sudo echo 'Hello LEMP from hostname $(TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"` && curl -H "X-aws-ec2-metadata-token: $TOKEN" -s http://169.254.169.254/latest/meta-data/public-hostname) with public IP $(TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"` && curl -H "X-aws-ec2-metadata-token: $TOKEN" -s http://169.254.169.254/latest/meta-data/public-ipv4)' > /var/www/projectLEMP/index.html
```

Now I go to my browser and try to open my website URL using my IP address:

```url
http://<Public-IP-Address>:80
```


I've compiled all the steps from the images you provided into a single, comprehensive GitHub-ready markdown document, written in the first person as if you are performing the work.

-----

## Step 5 – Testing PHP with Nginx 🧪

My LEMP stack should now be completely set up, installed, and fully operational. I can test it to validate that Nginx can correctly hand **.php** files off to my PHP processor.

I do this by creating a test PHP file in my document root. I open a new file called **info.php** within my document root in my text editor:

```bash
$ nano /var/www/projectLEMP/info.php
```

I type or paste the following lines into the new file. This is valid PHP code that will return information about my server:

```php
<?php
phpinfo();
?>
```
![Screenshot of output](./Images/Picture15.png)



You can now access this page in your web browser by visiting the domain name or public IP address you've set up in your Nginx configuration file, followed by `/info.php`:

```url
http://'server_domain_or_IP'/info.php
```

You will see a web page containing detailed information about your server.

I've compiled the final steps of your LEMP stack implementation into a single markdown section, written in the first person as if you are performing the work. This completes the full process from installation to final PHP testing and cleanup.

-----


After checking the relevant information about my PHP server through that page, it's best to remove the file I created as it contains sensitive information about my PHP environment and my Ubuntu server. I use `rm` to remove that file:

```bash
$ sudo rm /var/www/your_domain/info.php
```

My LEMP stack is now fully functional and secured\!

-----



I will continue your personalized LEMP stack documentation, starting with the MySQL database and user creation, using the content from the provided images.

-----

I will continue your personalized LEMP stack documentation, resuming the steps for MySQL database user configuration in Step 6, using only the content from the provided images.

-----

## Step 6 — Retrieving data from MySQL database with PHP (Cont.) 💾

I'm continuing to create a test database and user for my Nginx website to query.

I've already connected to the MySQL console using the **root** account:

```bash
$ sudo mysql
```

I will create a database named `example_database` and a user named `example_user`, but I can replace these names with different values. The native MySQL PHP library doesn't support the default authentication for MySQL 8, so I need to create a new user with the `mysql_native_password` method.

To create the new database, I run the following command from my MySQL console:

```sql
mysql> CREATE DATABASE `example_database`;
```

Now I create a new user and grant him full privileges on the database I've just created. The user is named `example_user` and the password is set to `PassWord.1`:

```sql
mysql> CREATE USER 'example_user'@'%' IDENTIFIED WITH mysql_native_password BY 'PassWord.1';
```

Now I need to give this user permission over the **`example_database`** database:

```sql
mysql> GRANT ALL ON example_database.* TO 'example_user'@'%';
```

This command gives the `example_user` **full privileges** over the `example_database` database, while preventing this user from creating or modifying other databases on my server.

![Screenshot of output](./Images/Picture16.png)

Now I exit the MySQL shell with:

```sql
mysql> exit
```

I can test if the new user has the proper permissions by logging in to the MySQL console again, this time using the custom user credentials:

```bash
$ mysql -u example_user -p
```

I notice the **`-p`** flag in this command, which will prompt me for the password used when I created the `example_user`.

-----

I'll continue your personalized LEMP stack documentation, starting from the point where you last stopped in Step 6 (testing the new MySQL user), using only the content from the provided images.

-----

## Step 6 — Retrieving data from MySQL database with PHP (Cont.) 💾


I notice the **`-p`** flag in this command, which will prompt me for the password used when creating the `example_user` user. After logging in to the MySQL console, I confirm that I have access to the `example_database` database:

```sql
mysql> SHOW DATABASES;
```

This will give me the following output, confirming my database access:

```
Output
+--------------------+
| Database           |
+--------------------+
| example_database   |
| information_schema |
+--------------------+
2 rows in set (0.000 sec)
```

Next, I'll create a test table named **`todo_list`**. From the MySQL console, I run the following statement:


![Screenshot of output](./Images/Picture20.png)


-----

## Step 6 — Retrieving data from MySQL database with PHP (Cont.) 💾

I've already confirmed my access to the `example_database`.

Next, I'll create a test table named **`todo_list`**. From the MySQL console, I run the following statement:

```sql
mysql> CREATE TABLE example_database.todo_list (
mysql> item_id INT AUTO_INCREMENT,
mysql> content VARCHAR(255),
mysql> PRIMARY KEY (item_id)
mysql> );
```

Now I will insert a few rows of content into the test table. I might want to repeat the next command a few times, using different `VALUES`:

```sql
mysql> INSERT INTO example_database.todo_list (content) VALUES ("My first important item");
```

To confirm that the data was successfully saved to my table, I run:

![Screenshot of output](./Images/Picture21.png)



## Step 6 — Retrieving data from MySQL database with PHP (Cont.) 💾

I've successfully inserted data into my test table.

To confirm that the data was successfully saved to my table, I run:

```sql
mysql> SELECT * FROM example_database.todo_list;
```

I will see the following output, confirming the valid data in my test table:

```
Output
+-----------+------------------------+
| item_id | content                |
+-----------+------------------------+
| 1         | My first important item|
| 2         | My second important item|
| 3         | My third important item|
| 4         | and this one more thing|
+-----------+------------------------+
4 rows in set (0.000 sec)
```

After confirming that I have valid data in my test table, I can exit the MySQL console.



I've already confirmed that my test table has valid data and I can exit the MySQL console.

Now I can create a **PHP script** that will connect to MySQL and query for my content. I will create a new PHP file in my custom web root directory using my preferred editor. I will use `vi` for that:

```bash
$ nano /var/www/projectLEMP/todo_list.php
```

The following PHP script connects to the MySQL database and queries for the content of the **`todo_list`** table, displaying the results in a list. If there is a problem with the database connection, it will throw an exception.

I copy this content into my **`todo_list.php`** script:

![Screenshot of output](./Images/Picture22.png)



I've already created the PHP file **`todo_list.php`**.


```php
<?php
$user = "example_user";
$password = "PassWord.1";
$database = "example_database";
$table = "todo_list";

try {
    $db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
    echo "<h2>TODO</h2><ol>";

    foreach($db->query("SELECT content FROM $table") as $row) {
        echo "<li>" . $row['content'] . "</li>";
    }

    echo "</ol>";
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

?>
```

I save and close the file when I'm done editing.

-----
![Screenshot of output](./Images/Picture23.png)



I've already created the test file **`info.php`** to validate that Nginx can correctly process PHP.

You can now access this page in your web browser by visiting the domain name or public IP address you've set up in your Nginx configuration file, followed by **/info.php**:

```url
http://'server_domain_or_IP'/info.php
```

You will see a web page containing detailed information about your server.

After checking the relevant information about your PHP server through that page, it's best to **remove the file** you created as it contains sensitive information about your PHP environment and your Ubuntu server. You can use `rm` to remove that file:

```bash
$ sudo rm /var/www/your_domain/info.php
```

-----



You can now access this page in your web browser by visiting the domain name or public IP address configured for your website, followed by **/todo\_list.php**:

```url
http://<Public_domain_or_IP>/todo_list.php
```
