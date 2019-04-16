import razorpay
client = razorpay.Client(auth=("rzp_test_CRJSqdfTOakRE6", "j9RM1QMjKoU6G6N8vG9Mp3BW"))

client.set_app_details({"title" : "bidbay", "version" : "1.2"})

c = client.payment.fetch("pay_BZhNQLzt84hEj8")

print(c)
