from chalice import Chalice
import tempfile
import boto3
from botocore.exceptions import ClientError
from PIL import Image
from io import BytesIO
from pdf2image import convert_from_path

app = Chalice(app_name='pdf2jpeg')

bucket_name = "streamstoragestream-stream"
poppler_path = "lib/poppler-utils/usr/bin"
fmt = "jpeg"
format = 'JPEG'

s3_client = boto3.client('s3')
bucket_write = boto3.resource('s3').Bucket(bucket_name)

@app.on_s3_event(bucket = "streamstoragestream-stream")
def convert_pdf_jpeg(event):
    event_key = event.key
    print('event_key is', event_key)
    with tempfile.TemporaryDirectory() as temp_dir:
        file_name = temp_dir + "/test"
        s3_client.download_file(event.bucket, event_key, file_name)
        images = convert_from_path(file_name, output_folder=temp_dir, poppler_path=poppler_path)
        print('images', images)
        temp_images = []
        for i in range(len(images)):
            image_path = f'{temp_dir}/{i}.jpg'
            images[i].save(image_path, 'JPEG')
            temp_images.append(image_path)
        imgs = list(map(Image.open, temp_images))
        min_img_width = min(i.width for i in imgs)
        total_height = 0
        for i, img in enumerate(imgs):
            total_height += imgs[i].height
        merged_image = Image.new(imgs[0].mode, (min_img_width, total_height))
        y = 0
        for img in imgs:
            merged_image.paste(img, (0, y))
            y += img.height
        in_mem_file = BytesIO()
        merged_image.save(in_mem_file, format=format)
        print(in_mem_file)
        key = event_key.split('.')[0] + '.' + fmt
        print(key)
        response = bucket_write.put_object(Body=in_mem_file.getvalue(),
                                           ContentType="image/" + fmt,
                                           Key=key)
        print(response)

