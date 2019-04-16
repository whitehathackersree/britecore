from __future__ import absolute_import, unicode_literals
import smtplib
import http.client
import urllib # Python URL functions
import urllib.request, urllib.error, urllib.parse

def sendSMS(mobileNo, message):
	authkey = "119385AfUjkB7hCRTh5787ecf3"
	mobiles=mobileNo
	message=message
	sender="BIDBUZ"
	route="4"
	values={
		'authkey':authkey,
		'mobiles':mobiles,
		'message':message,
		'sender':sender,
		'route':route
	}
	url = "http://api.msg91.com/api/sendhttp.php" # API URL
	postdata = urllib.parse.urlencode(values).encode("utf-8") # URL encoding the data here.
	req = urllib.request.Request(url, postdata)
	response = urllib.request.urlopen(req)
	output = response.read()
	return output
