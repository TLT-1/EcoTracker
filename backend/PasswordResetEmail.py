import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart



def email(receiver_email):
    # Set up the SMTP server
    smtp_server = "smtp.gmail.com"
    smtp_port = 587  # For starttls
    username = "ecotracker2023@gmail.com"
    password = "bkmwlpiuovvpxnke"
    # Create the message
    sender_email = "ecotracker2023@gmail.com"
    
    subject = "Welcome To EcoTracker"

    # Create an HTML body for the email
    html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <p>Hello, World!</p>
        <p>Your password has been reset</p>
    </body>
    </html>
    """


    # Set up the MIME structure
    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = receiver_email

    # Attach the HTML part
    html_part = MIMEText(html, "html")
    message.attach(html_part)

    # Send the email
    try:
        # Connect to the SMTP server
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Secure the connection
        server.login(username, password)

        # Send the email
        server.send_message(message)
        print("HTML email sent successfully!")
    except Exception as e:
        # Print any error messages to stdout
        print(e)
    finally:
        server.quit()