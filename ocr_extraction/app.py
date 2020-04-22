from chalice import Chalice

app = Chalice(app_name='ocr_extraction')

@app.on_s3_event(bucket= "streamstoragestream-stream")
def detect_file(event):
    print(event.key)