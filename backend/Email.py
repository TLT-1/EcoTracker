import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def email(receiver_email, verification_code):
    # Set up the SMTP server
    smtp_server = "smtp.gmail.com"
    smtp_port = 587  # For starttls
    username = "ecotracker2023@gmail.com"
    password = "bkmwlpiuovvpxnke"
    # Create the message
    sender_email = "ecotracker2023@gmail.com"
    
    subject = "Welcome To EcoTrack"

    # Create an HTML body for the email
    html = f"""
<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            position: relative;
        }}
        .container {{
            width: 80%;
            margin: auto;
            position: relative;
        }}
        .header {{
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #e5e5e5;
        }}
        .image-container {{
            position: relative;
        }}
        .image-container img {{
            width: 100%;
            display: block;
        }}
        .text-container {{
            color: black;
            text-align: center;
            padding: 20px;
            font-size: 18px;
        }}
    </style>
</head>
<body style="margin: 0; padding: 0;">
    <div class="container">
        <div class="header">
            <h1>Welcome To EcoTrack!</h1>
        </div>
        <div class="text-container">
            <p>Your Verification Code Is: {verification_code}</p>
        </div>
        <div class="image-container">
            <img src="https://i.ibb.co/2Y1WkxF/eco-Track-Title-Screen.png" alt="Background Image">
        </div>
    </div>
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
