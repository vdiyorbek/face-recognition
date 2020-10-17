import React, { Component } from "react";
import "./App.css";
import * as faceapi from "face-api.js";
Promise.all([
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
]);

class App extends Component {
  imagestart = async (event) => {
    let image;
    let canvas;
    image = await faceapi.bufferToImage(event.target.files[0]);
    if (image) image.remove();
    if (canvas) image.remove();
    const container=document.createElement('div');
    container.style.position='relative';
    document.body.append(container);
    container.append(image);
    const detections = await faceapi
      .detectSingleFace(image)
      .withFaceLandmarks()
      .withFaceDescriptor();
    const displaySize = { width: image.width, height: image.height };
    canvas=faceapi.createCanvasFromMedia(image);
    container.append(canvas);
    faceapi.matchDimensions(canvas, displaySize);
    
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    const resizedResults = faceapi.resizeResults(
      detections,
      displaySize
    );
    faceapi.draw.drawDetections(canvas, resizedResults);
    faceapi.draw.DrawFaceLandmarks(canvas, resizedResults);

    //  event.target.files[0],
  };
  render() {
    return (
      <div className="App">
        <input type="file" id="myimage" onChange={this.imagestart} />
      </div>
    );
  }
}

export default App;
