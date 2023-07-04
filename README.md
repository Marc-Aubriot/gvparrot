# To deploy locally: 
--------
1. "gh repo clone Marc-Aubriot/gvparrot"
2. "npm i node"
---------
That's it ! The repository is now up to date :D


-
## Now let's start it!

### First to run the back-end PHP Server do this:
-------
3. install VSCode extension "PHP Server" by "brapifra" 
4. Go in gvparrot>back>public_html>index.php and press CTRL+SHIFT+P then input "PHP Server: Serve project" (or right click in file and then "PHP Server: Serve project")
-------
-
### Now we need to start the front-end REACT project, so open a new terminal (CTRL+SHIFT+ù) and then run depending on your folder:
-------
5. "cd gvparrot"
6. "npm start"
-------
Everything should be up and running, if you don't see the live server be sure to try the Network version of your local server

(it should be http://192.168.1.10:3000, REACT will give you the link in the terminal when after npm start)

http://localhost:3000 (is the back-end php server)
http://192.168.1.10:3000 (is the front-end React server)

-
### Now we need the DATABASE ! 
----
7. Use Xampp-control.exe (you can download xampp here https://www.apachefriends.org/ ) and then start Apache and Mysql in the control panel
8. Open MySQL Workbench and run the SQL files in gvparrot>back>sql in this order :
    1. createDB.sql
    2. procedure.sql
    3. createAdmin.sql (here you can modify the login and password of the admin if you need otherwise it will be "superadmin@outlook.fr"/"123456")
    4. populateDB.sql
(alternatively you can use whatever you want to run the sql files)
----

-
Congratulations !
In less than 10 steps (5min) you now have the full app running :D
