import React, { useState, useRef } from 'react';
import axios from "axios";
import './Predict.css';
import Image1 from './images/cherry.jpg'

const Predict = () => {
    const [image, setImage] = useState();
    const [result, setResult] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const api = "http://127.0.0.1:5000/predict";
    const fileInputRef = useRef(null);
    const [selectCat,setSetectCat] = useState("apple")


    const category = ["apple", "cherry", "corn", "grape", "peach", "potato", "tomato"]
    const apple = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy']
    const cherry = ['Cherry___Powdery_mildew', 'Cherry___healthy']
    const corn = ['Corn___Cercospora_leaf_spot Gray_leaf_spot', 'Corn___Common_rust', 'Corn___Northern_Leaf_Blight',
        'Corn___healthy']
    const grape = ['Grape___Black_rot', 'Grape___Esca_(Black_Measles)',
        'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy']
    const peach = ['Peach___Bacterial_spot', 'Peach___healthy']
    // const cherry = ['Pepper_bell___Bacterial_spot', 'Pepper_bell___healthy',]
    const potato = ['Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy']
    // 'Raspberry___healthy',
    //   'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    const tomato = ['Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
        'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
        'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy']



    const [loading, setloading] = useState(false)

    const predict = async () => {
        try {
            if (isImageSelected) {
                const data = {
                    "image": image.split(",")[1],
                    "name": selectCat
                };
                setloading(true)
                const response = await axios.post(api, data);
                if (response) {
                    console.log(response.data[0])
                    const maxIndex = response.data[0].indexOf(Math.max(...response.data[0]));
                    console.log(maxIndex, [maxIndex])
                    let disc = []
                    if (selectCat === "apple") disc = apple
                    else if (selectCat === "cherry") disc = cherry
                    else if (selectCat === "corn") disc = corn
                    else if (selectCat === "potato") disc = potato
                    else if (selectCat === "tomato") disc = tomato
                    else if (selectCat === "peach") disc = peach
                    else if (selectCat === "grape") disc = grape
                    setResult(disc[maxIndex])
                    setloading(false)
                }
            } else {
                setloading(false)
                alert("Please select an image")
            }
        } catch (err) {
            setloading(false)
            console.log(err);
        }
    };

    const convertToBase64 = (e) => {
        setResult(null);
        setIsImageSelected(true);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <h1 style={{ margin: 30 }}>PlantAi</h1>
            <h2 style={{marginLeft:30}}>Select to Predict</h2>
            <div className='image-grid'>
                {
                    category.map(cat => (
                        <div onClick={() => setSetectCat(cat)} className={`${selectCat === cat ? "selectCat" : ""} imagebtn`}>
                            <div>{cat}</div>
                            <img className='image' src={require(`./images/${cat}.jpg`)} alt={cat} />
                        </div>
                    ))
                }
            </div>
            <div className="main-wrapper">
                <div className="main-input-div">
                    <div className="input-image-div" onClick={triggerFileInput}>
                        <div>
                            {isImageSelected ? (
                                <div>
                                    <i className="fas fa-check-circle" style={{ color: 'lightgreen' }}></i>
                                    <p> Image is selected </p>
                                </div>
                            ) : (
                                <div>
                                    <i className="fas fa-upload"></i>
                                    <p> Click to Upload Image </p>
                                </div>
                            )
                            }
                        </div>
                    </div>
                    <input
                        ref={fileInputRef}
                        id="imageupload"
                        className="hidden"
                        type="file"
                        accept="image/*"
                        onChange={(e) => convertToBase64(e)}
                    />

                    <button onClick={predict}>{loading ? "Predicting" : "Predict"}</button>
                </div>
                <div style={{ textAlign: 'center' }} className="main-info-div">
                    <h1 >Result Of Scan</h1>
                        <div>
                            {result ? result : ""}
                        </div>
                    

                    
                    {/* {result && result === "yes" ? (
                        <p><span style={{color:'red'}}>PNEUMONIA DETECTED.</span> This finding indicates that there are abnormalities present in your chest X-ray suggestive of pneumonia, a serious lung infection. While this analysis provides valuable initial insights, it's crucial that you seek guidance from a qualified healthcare professional for a thorough evaluation and personalized treatment plan."</p>
                    ) : result && result === "no" ? (
                        <p style={{color:'lightgreen'}}>Your chest X-ray appears normal. This means that no abnormalities indicative of pneumonia or other significant lung conditions were detected. While this result is encouraging, it's still important to monitor your health and seek medical attention if you experience any concerning symptoms or if your condition changes."</p>
                    ): result && result === "err" ?(
                        <p>Something went wrong. Upload another image!"</p>
                    ):""} */}


                </div>
            </div>


            <div className="below-wrapper">
                <div className="below-wrapper-text">
                    <h1>What it does?</h1>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                </div>
                <div className="below-wrapper-img">
                    <img src={Image1} alt="image1" />
                </div>

            </div>
        </div>
    );
};

export default Predict;
