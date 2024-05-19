from flask import Flask, request, jsonify, session
import pyodbc
import re
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app) 
# CORS(app, resources={r"/login": {"origins": "http://localhost:3000"}})  # Allow only http://localhost:3000 for /login route


app.secret_key = '121212'

# SQL Server database setup
conn = pyodbc.connect(
    'DRIVER={SQL Server};'   
    'SERVER=144.76.195.231\MSSQLSERVER2016;'
    'DATABASE=FinalYearProject;' 
    'UID=admin;'   
    'PWD=Faisal_Awan'  
)
cursor = conn.cursor()

# Create a table for users
def create_table():
    cursor.execute(''' 
        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users')
        BEGIN
            CREATE TABLE users (
                id INT PRIMARY KEY IDENTITY(1,1),
                username VARCHAR(50) NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(100) NOT NULL
            )
        END
    ''')
    conn.commit()

create_table()




# @app.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     password = data.get('password')
#     email = data.get('email')
#     cursor.execute('SELECT * FROM users WHERE email = ? AND password = ?', (email, password))
#     account = cursor.fetchone()
#     if account:
#         session['loggedin'] = True
#         session['id'] = account[0]
#         session['email'] = account[1]
#         response = jsonify({'success': True, 'message': 'Logged in successfully !'})
#         response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
#         return response
#     else:
#         response = jsonify({'success': False, 'message': 'Incorrect email / password !'})
#         response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
#         return response






@app.route('/login', methods=['POST'])
def login():
    data = request.json
   # username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    cursor.execute('SELECT * FROM users WHERE email = ? AND password = ?', (email, password))
    account = cursor.fetchone()
    if account:
        session['loggedin'] = True
        session['id'] = account[0]
        session['email'] = account[1]
        return jsonify({'success': True, 'message': 'Logged in successfully !'})
        
        
    
    else:
        return jsonify({'success': False, 'message': 'Incorrect email / password !'})

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True, 'message': 'Logged out successfully !'})

@app.route('/register', methods=['POST'])
def register():

    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
  
    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    account = cursor.fetchone()
    if account:
        return jsonify({'success': False, 'message': 'Account already exists !'})
    elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        return jsonify({'success': False, 'message': 'Invalid email address !'})
    elif not re.match(r'[A-Za-z0-9]+', username):
        return jsonify({'success': False, 'message': 'Username must contain only characters and numbers !'})
    elif not username or not password or not email:
        return jsonify({'success': False, 'message': 'Please fill out the form !'})
    else:
        cursor.execute('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', (username, password, email))
        conn.commit()
        return jsonify({'success': True, 'message': 'You have successfully registered !'})

if __name__ == '__main__':
    app.run(debug=True)


























# from flask import Flask, render_template, request, redirect, url_for, session
# import pyodbc
# import re

# app = Flask(__name__)

# app.secret_key = '121212'

# # SQL Server database setup
# conn = pyodbc.connect(
    # 'DRIVER={SQL Server};'   
    # 'SERVER=144.76.195.231\MSSQLSERVER2016;'
    # 'DATABASE=FinalYearProject;' 
    # 'UID=admin;'   
    # 'PWD=Faisal_Awan'  
# )
# cursor = conn.cursor()

# # Create a table for users
# def create_table():
    # cursor.execute(''' 
        # IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users')
        # BEGIN
            # CREATE TABLE users (
                # id INT PRIMARY KEY IDENTITY(1,1),
                # username VARCHAR(50) NOT NULL,
                # password VARCHAR(255) NOT NULL,
                # email VARCHAR(100) NOT NULL
            # )
        # END
    # ''')
    # conn.commit()

# create_table()

# @app.route('/')
# @app.route('/login', methods=['GET', 'POST'])
# def login():
    # msg = ''
    # if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        # username = request.form['username']
        # password = request.form['password']
        # cursor.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))
        # account = cursor.fetchone()
        # if account:
            # session['loggedin'] = True
            # session['id'] = account[0]
            # session['username'] = account[1]
            # msg = 'Logged in successfully !'
            # return render_template('index.html', msg=msg)
        # else:
            # msg = 'Incorrect username / password !'
    # return render_template('login.html', msg=msg)

# @app.route('/logout')
# def logout():
    # session.pop('loggedin', None)
    # session.pop('id', None)
    # session.pop('username', None)
    # return redirect(url_for('login'))

# @app.route('/register', methods=['GET', 'POST'])
# def register():
    # msg = ''
    # if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        # username = request.form['username']
        # password = request.form['password']
        # email = request.form['email']
        # cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
        # account = cursor.fetchone()
        # if account:
            # msg = 'Account already exists !'
        # elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            # msg = 'Invalid email address !'
        # elif not re.match(r'[A-Za-z0-9]+', username):
            # msg = 'Username must contain only characters and numbers !'
        # elif not username or not password or not email:
            # msg = 'Please fill out the form !'
        # else:
            # cursor.execute('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', (username, password, email))
            # conn.commit()
            # msg = 'You have successfully registered !'
    # elif request.method == 'POST':
        # msg = 'Please fill out the form !'
    # return render_template('register.html', msg=msg)

# if __name__ == '__main__':
    # app.run(debug=True)










# # Store this code in 'app.py' file

# from flask import Flask, render_template, request, redirect, url_for, session
# #from flask_mysqldb import MySQL
# import MySQLdb.cursors
# import re
# import pyodbc


# app = Flask(__name__)

# # SQL Server database setup
# conn = pyodbc.connect(
    # 'DRIVER={SQL Server};'   
    # 'SERVER=144.76.195.231\MSSQLSERVER2016;'
    # 'DATABASE=FinalYearProject;' 
    # 'UID=admin;'   
    # 'PWD=Faisal_Awan'  
# )
# cursor = conn.cursor()

# #mysql = MySQL(app)

# # Create a table for test items
# def create_table():
# cursor.execute(''' 
 # IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users')
    # BEGIN
        # CREATE TABLE users (
            # id INT AUTO_INCREMENT PRIMARY KEY,
            # username VARCHAR(50) NOT NULL,
            # password VARCHAR(255) NOT NULL,
            # email VARCHAR(100) NOT NULL
        # )
    # END
# ''')

# create_table();


# @app.route('/')
# @app.route('/login', methods =['GET', 'POST'])
# def login():
	# msg = ''
	# if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
		# username = request.form['username']
		# password = request.form['password']
		# cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		# cursor.execute('SELECT * FROM accounts WHERE username = % s AND password = % s', (username, password, ))
		# account = cursor.fetchone()
		# if account:
			# session['loggedin'] = True
			# session['id'] = account['id']
			# session['username'] = account['username']
			# msg = 'Logged in successfully !'
			# return render_template('index.html', msg = msg)
		# else:
			# msg = 'Incorrect username / password !'
	# return render_template('login.html', msg = msg)

# @app.route('/logout')
# def logout():
	# session.pop('loggedin', None)
	# session.pop('id', None)
	# session.pop('username', None)
	# return redirect(url_for('login'))

# @app.route('/register', methods =['GET', 'POST'])
# def register():
	# msg = ''
	# if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form :
		# username = request.form['username']
		# password = request.form['password']
		# email = request.form['email']
		# cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		# cursor.execute('SELECT * FROM accounts WHERE username = % s', (username, ))
		# account = cursor.fetchone()
		# if account:
			# msg = 'Account already exists !'
		# elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
			# msg = 'Invalid email address !'
		# elif not re.match(r'[A-Za-z0-9]+', username):
			# msg = 'Username must contain only characters and numbers !'
		# elif not username or not password or not email:
			# msg = 'Please fill out the form !'
		# else:
			# cursor.execute('INSERT INTO accounts VALUES (NULL, % s, % s, % s)', (username, password, email, ))
			# mysql.connection.commit()
			# msg = 'You have successfully registered !'
	# elif request.method == 'POST':
		# msg = 'Please fill out the form !'
	# return render_template('register.html', msg = msg)


# if __name__ == '__main__':
    # app.run(debug=True)