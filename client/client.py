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

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
print(socket.gethostname())

s.connect(("8.8.8.8", 80))
ip = s.getsockname()[0]
print(ip)
s.close()

hostname = socket.gethostname()
last_updated = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')
# your variables are already assigned before this
data = {'ip': ip, 'hostname': hostname, 'last_updated': last_updated}

doc_ref = db.collection(u'address_book').document(u'padonk')
doc_ref.set(data)
# doc_ref.set({
#     u'first': u'Ada',
#     u'last': u'Lovelace',
#     u'born': 1815
# })

# results = db.child("users").push(data, user['idToken'])

# sent = json.dumps(data)
# result = firebase.post("/businesses", sent)
