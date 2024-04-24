import base64
from io import BytesIO
from flask_cors import CORS
from flask import Flask, jsonify, request
from PIL import Image
import io
import numpy as np
from tensorflow.keras.models import load_model
import tensorflow as tf

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    base64_string = data["image"]
    image_data = base64.b64decode(base64_string)
    img = Image.open(io.BytesIO(image_data))
    img = img.resize((256, 256))
    test_img = tf.keras.utils.img_to_array(img)
    test_img = np.expand_dims(test_img, axis=0)

    name = data["name"]
    filename = f"models/{name}.h5"

    model = load_model(filename, compile=False)
    predictions = model.predict(test_img)

    return jsonify(predictions.tolist())


if __name__ == '__main__':
    app.run()