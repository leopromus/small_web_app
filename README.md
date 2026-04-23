# Small App - Full Stack CRUD Application with MySQL

A complete web application with React frontend, Node.js backend, MySQL database, custom domain support, and built-in monitoring.

## Features

- ✅ Create, Read, Delete items
- ✅ Responsive modern UI
- ✅ RESTful API with MySQL
- ✅ MySQL database (compatible with local & Render)
- ✅ Health check endpoint for monitoring
- ✅ Ready for custom domain
- ✅ Auto-deploy on Render

## Local Development with MySQL

### Option 1: Using local MySQL

1. **Install MySQL**
   - macOS: `brew install mysql && brew services start mysql`
   - Windows: Download from https://dev.mysql.com/downloads/installer/
   - Ubuntu: `sudo apt-get install mysql-server`

2. **Create database**
```bash
mysql -u root -p
CREATE DATABASE small_app;
EXIT;