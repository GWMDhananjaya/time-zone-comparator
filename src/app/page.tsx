"use client";
import { useState, useEffect } from "react";
import moment from "moment-timezone";

const countryTimeZones: Record<string, string> = {
  USA: "America/New_York",
  "Sri Lanka": "Asia/Colombo",
  UK: "Europe/London",
  Germany: "Europe/Berlin",
  Japan: "Asia/Tokyo",
  France: "Europe/Paris",
};

const TimeZoneComparator = () => {
  const [country1, setCountry1] = useState("USA");
  const [country2, setCountry2] = useState("France");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [convertedTime, setConvertedTime] = useState("");
  const [currentTime1, setCurrentTime1] = useState("");
  const [currentTime2, setCurrentTime2] = useState("");

  useEffect(() => {
    const updateTimes = () => {
      setCurrentTime1(moment.tz(countryTimeZones[country1]).format("hh:mm A"));
      setCurrentTime2(moment.tz(countryTimeZones[country2]).format("hh:mm A"));
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [country1, country2]);

  const handleConvert = () => {
    if (!date || !time) return;
    const fullDateTime = `${date}T${time}`;
    const timeInCountry1 = moment.tz(
      fullDateTime,
      "YYYY-MM-DDTHH:mm",
      countryTimeZones[country1]
    );
    const timeInCountry2 = timeInCountry1
      .clone()
      .tz(countryTimeZones[country2])
      .format("YYYY-MM-DD hh:mm A");
    setConvertedTime(timeInCountry2);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-900 via-purple-900 to-black text-white p-6">
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-3xl shadow-lg max-w-lg w-full text-center border border-white/20">
        <h1 className="text-4xl font-extrabold text-white mb-15 tracking-wide">
          <span className="text-5xl">Time Zone</span> Comparator
        </h1>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Select Country 1
            </label>
            <select
              value={country1}
              onChange={(e) => setCountry1(e.target.value)}
              className="p-3 w-full rounded-xl bg-gray-900 text-white border border-white/20 outline-none focus:ring-2 focus:ring-purple-400"
            >
              {Object.keys(countryTimeZones).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <p className="mt-2 text-lg font-medium text-purple-300">
              🕒 {currentTime1}
            </p>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Select Country 2
            </label>
            <select
              value={country2}
              onChange={(e) => setCountry2(e.target.value)}
              className="p-3 w-full rounded-xl bg-gray-900 text-white border border-white/20 outline-none focus:ring-2 focus:ring-purple-400"
            >
              {Object.keys(countryTimeZones).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <p className="mt-2 text-lg font-medium text-purple-300">
              🕒 {currentTime2}
            </p>
          </div>
        </div>

        {/* Date & Time Inputs */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 w-full rounded-xl bg-gray-900 text-white border border-white/20 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              Select Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-3 w-full rounded-xl bg-gray-900 text-white border border-white/20 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full py-3 text-lg font-semibold rounded-xl bg-purple-500 hover:bg-purple-600 transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Convert Time
        </button>

        {/* Converted Time Display */}
        {convertedTime && (
          <div className="mt-6 text-lg font-medium text-purple-200">
            🕒 Converted Time in {country2}:{" "}
            <span className="font-bold text-white">{convertedTime}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeZoneComparator;
