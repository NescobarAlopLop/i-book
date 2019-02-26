import json
import datetime
import time
import socket
import pyrebase as firebase

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate(
    '/home/ge/Documents/i-book-d5521-firebase-adminsdk-agsxj-68d6ede0d0.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

while True:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    print(socket.gethostname())

    s.connect(("8.8.8.8", 80))
    ip = s.getsockname()[0]
    print(ip)
    s.close()

    hostname = socket.gethostname()
    last_updated = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')

    data = {'ip': ip, 'hostname': hostname, 'last_updated': last_updated}

    try:
        doc_ref = db.collection(u'address_book').document(hostname)
        doc_ref.set(data)
    except Exception as e:
        print(e)
    # time.sleep(3 * 60)
    time.sleep(3)
