import { useState } from 'react';

export default function Weather() {
  const [city, setCity] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      // 1. Get Coordinates for the city
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      
      if (geoData.results) {
        const { latitude, longitude, name } = geoData.results[0];
        // 2. Get Weather for those coordinates
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherRes.json();
        setData({ name, temp: weatherData.current_weather.temperature, code: weatherData.current_weather.weathercode });
      }
    } catch (error) {
      console.error("Weather Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
        <input 
          className="bg-transparent flex-1 outline-none text-xs px-3 py-2 text-white"
          placeholder="Enter city (e.g. Lagos)..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button onClick={fetchWeather} className="bg-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-white">
          {loading ? '...' : 'Search'}
        </button>
      </div>

      <div className="h-32 flex flex-col justify-center items-center bg-indigo-500/5 rounded-3xl border border-indigo-500/10">
        {data ? (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <p className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest">{data.name}</p>
            <p className="text-5xl font-black text-white mt-1">{data.temp}°C</p>
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">Waiting for input...</p>
        )}
      </div>
    </div>
  );
}