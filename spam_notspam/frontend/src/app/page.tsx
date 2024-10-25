'use client'
import React, { useState } from 'react';

export default function EmailPredictor() {
  const [emailText, setEmailText] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: emailText }),
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex flex-col items-center justify-center px-4 text-black">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Email Text Predictor</h2>
        <p className="text-gray-600 mb-6 text-center">Enter the text of your email to get a prediction</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="emailText" className="block text-sm font-medium text-gray-700 mb-1">
              Email Text
            </label>
            <textarea
              id="emailText"
              placeholder="Enter your email's text here"
              required
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Predict
          </button>
        </form>
        {prediction && (
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold text-lg mb-2 text-blue-800">Prediction:</h3>
            <p className="text-blue-900">{prediction}</p>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <img
          src="/assets/pic1.jpg"
          alt="Image 1"
          className="w-64 h-64 object-cover shadow-md"
        />
        <img
          src="/assets/pic2.jpg"
          alt="Image 2"
          className="w-64 h-64 object-cover shadow-md"
        />
        <img
          src="/assets/pic3.jpg"
          alt="Image 3"
          className="w-64 h-64 object-cover shadow-md"
        />
      </div>
    </div>
  );
}
