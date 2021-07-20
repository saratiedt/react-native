import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";

const App = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black"; // cor do risco
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const selecionaVermelho = () => {
    const canvas = canvasRef.current;
    var context = canvas.getContext("2d");
    context.strokeStyle = "red";
  };

  const selecionaVerde = () => {
    const canvas = canvasRef.current;
    var context = canvas.getContext("2d");
    context.strokeStyle = "green";
  };

  const selecionaAzul = () => {
    const canvas = canvasRef.current;
    var context = canvas.getContext("2d");
    context.strokeStyle = "blue";
  };

  return (
    <View>
      <View>
        <nav className="navbar">
          <h1>Paint</h1>
        </nav>
        <div className="container">
          <h3>Meu desenho</h3>
          <div className="botoes">
            <button onClick={selecionaVermelho} id="vermelho"></button>
            <button onClick={selecionaVerde} id="verde"></button>
            <button onClick={selecionaAzul} id="azul"></button>
          </div>
        </div>
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        ></canvas>
      </View>
    </View>
  );
};

export default React.forwardRef(App);
